import {
    BadRequestException, Injectable, NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Options } from './dto/options.dto'
import { Meta, Result } from './dto/result.dto'
import { ProductCreateDto, WhichProductDto } from './dto/product.dto'
import { ReviewDto } from './dto/review.dto'
import { Product } from './entities/product.entity'
import { Review } from './entities/review.entity'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Review)
        private readonly reviewRepo: Repository<Review>
    ) {}

    async getProducts(options: Options): Promise<Result> {
        const itemsCount = await this.productRepo.count()
        const entities = await this.productRepo.find({
            order: { [options.by]: options.order },
            skip: options.skip,
            take: options.take
        })

        const meta = new Meta(options.page, options.take, itemsCount)
        return new Result(entities, meta)
    }

    async getProduct(id: number): Promise<Product> {
        const result = await this.productRepo.findOne({
            where: { id: id },
            relations: ['allSpecifications', 'description', 'reviews']
        })
        if (!result) throw new NotFoundException()
        return result
    }

    async getByCategory(which: WhichProductDto): Promise<Product[]> {
        const result = await this.productRepo.find({
            where: {
                category: { id: which.category },
                subCategory: { id: which.subCategory }
            }
        })
        if (!result) throw new NotFoundException()
        return result
    }

    async getSmallImages(): Promise<Product[]> {
        return await this.productRepo.find({ take: 8 })
    }

    async createProduct(product: ProductCreateDto): Promise<string> {
        const product_ = this.productRepo.create(product)
        await this.productRepo.save(product_)
        return 'Has been created'
    }

    async createReview(review: ReviewDto, req: any): Promise<void> {
        const user = await this.reviewRepo.findOne({
            where: { user: req.userId }
        })
        if (user) throw new BadRequestException(
            'This user has already written review'
        )

        const review_ = this.reviewRepo.create(review)
        review_.user = req.userId
        await this.reviewRepo.save(review_)
    }

    async getReviews(): Promise<Review[]> {
        return await this.reviewRepo.find({
            relations: ['product', 'user']
        })
    }

    async getReview(id: number): Promise<Review> {
        const result = await this.reviewRepo.findOne({
            where : { product: { id: id } },
            relations: ['product', 'user']
        })

        if (!result) throw new NotFoundException()
        return result
    }
}
