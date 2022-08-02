import {
    BadRequestException, Injectable, NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, In, Repository } from 'typeorm'
import { Options } from './dto/options.dto'
import { Meta, Result } from './dto/result.dto'
import { BuyProductDto, ProductCreateDto } from './dto/product.dto'
import { ReviewDto } from './dto/review.dto'
import { Product } from './entities/product.entity'
import { ProductReviews } from './entities/product-reviews.entity'
import { ProductLikes } from './entities/likes.entity'
import { History } from './entities/history.entity'
import { User } from 'src/users/entities/user.entity'
import { Search } from './dto/search.dto'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(ProductLikes)
        private readonly productLikesRepo: Repository<ProductLikes>,
        @InjectRepository(ProductReviews)
        private readonly productReviewRepo: Repository<ProductReviews>,
        @InjectRepository(History)
        private readonly historyRepo: Repository<History>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    async getProducts(options: Options): Promise<Result> {
        let entities: Product[]
        let count: number

        if (options.popular === 'true') {
            entities = await this.productRepo.query(`
                SELECT product.id, "imageUrl", title, price
                FROM product
                JOIN (
                    SELECT "productId", COUNT(*) AS cnt
                    FROM product_likes
                    GROUP BY "productId"
                    ORDER BY cnt DESC
                    LIMIT $1
                    OFFSET $2
                ) AS popular ON popular."productId" = product.id
            `, [options.take, options.skip])
            count = await this.productLikesRepo.query(`
                select row_number() over() from product_likes
                group by "productId"
                ORDER BY "row_number" DESC
                LIMIT $1;
            `, [1])
            count = +count[0].row_number
        } else if (options.discounts === 'true') {
            entities = await this.productRepo.query(`
                SELECT product.id, "imageUrl", title, price,
                discount, total_price
                FROM product
                LEFT OUTER JOIN discounts on
                discounts."productId" = product.id
                LIMIT $1
                OFFSET $2
            `, [options.take, options.skip])
            count = await this.productRepo.count()
        } else {
            entities = await this.productRepo.find({
                select: ['id', 'imageUrl', 'title', 'price'],
                order: { [options.by]: options.order },
                skip: options.skip,
                take: options.take
            })
            count = await this.productRepo.count()
        }

        const meta = new Meta(options.page, options.take, count)
        return new Result(entities, meta)
    }

    async getProduct(id: number): Promise<Product> {
        const result = await this.productRepo.findOne({
            where: { id: id },
            relations: [
                'allSpecifications',
                'description',
                'reviews',
                'discounts',
                'category',
                'subCategory'
            ]
        })
        if (!result) throw new NotFoundException()
        return result
    }

    async createProduct(product: ProductCreateDto): Promise<string> {
        const product_ = this.productRepo.create(product)
        await this.productRepo.save(product_)
        return 'Has been created'
    }

    async createReview(review: ReviewDto, req: any): Promise<void> {
        const review_ = this.productReviewRepo.create(review)
        review_.user = req.userId
        await this.productReviewRepo.save(review_)
    }

    async getReviews(id: number): Promise<ProductReviews[]> {
        return await this.productReviewRepo.query(`
            SELECT product_reviews."id", "text", stars, "name"
            FROM product_reviews
            JOIN "user" "User" ON "User".id = product_reviews."userId"
            WHERE product_reviews."id" = $1
        `, [id])
    }

    async getSimilarProducts(id: number): Promise<Product[]> {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['subCategory']
        })
        if (!product) throw new NotFoundException()

        return await this.productRepo.find({
            relations: ['subCategory'],
            where: { subCategory: { id: product.subCategory.id } },
            order: { id: 'DESC' },
            take: 4
        })
    }

    async like(id: any, req: any): Promise<void> {
        const likeExist = await this.productRepo.findOne({ where: { id } })
        if (!likeExist) throw new NotFoundException()

        const isRepeat = await this.productLikesRepo.query(
            'SELECT "productId" + "userId" AS sum ' +
            `FROM product_likes ` +
            'WHERE "userId" = $1 AND "productId" = $2', [req.userId, id]
        )

        if (isRepeat[0] && isRepeat[0].sum === req.userId + id)
            throw new BadRequestException('This user has already liked')

        const like = this.productLikesRepo.create()
        like.product = id
        like.user = req.userId
        await this.productLikesRepo.save(like)
    }

    async unlike(id: any, req: any): Promise<DeleteResult> {
        return await this.productLikesRepo.delete({
            product: id,
            user: req.userId
        })
    }

    async buyProduct(buy: BuyProductDto): Promise<void> {
        const { ids, phone, ...data } = buy
        const user = await this.userRepo.findOne({ where: { phone } })
        await this.productRepo.delete({
            id: In([...ids])
        })
        const history = this.historyRepo.create(data)
        const num: any = user.id
        history.user = num
        await this.historyRepo.save(history)
    }

    async getHistory(req: any): Promise<History[]> {
        return await this.historyRepo.find({
            where: { user: { id: req.userId } }
        })
    }

    async search(query: Search): Promise<Product[]> {
        return await this.productRepo.query(`
            SELECT id, "imageUrl", title
            FROM product
            WHERE title @@ to_tsquery('simple', '${query.word}:*')
            LIMIT 7
        `)
    }
}
