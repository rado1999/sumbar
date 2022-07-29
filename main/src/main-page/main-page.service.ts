import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { WhichProductDto } from 'src/menu/dto/which-product.dto'
import { Product } from 'src/product/entities/product.entity'
import { In, Repository } from 'typeorm'
import { Options } from './dto/options.dto'
import { Meta, Result } from './dto/result.dto'
import { Brands } from './entities/brands.entity'

@Injectable()
export class MainPageService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Brands)
        private readonly brandsRepo: Repository<Brands>
    ) {}

    async getSmallImages(): Promise<Product[]> {
        return await this.productRepo.find({
            where: {
                subCategory: { id: In([ 5, 10, 15, 20, 25, 30, 35, 40 ]) }
            },
            relations: ['allSpecifications', 'description', 'reviews'],
            take: 8
        })
    }

    async getNewProducts(): Promise<Product[]> {
        return await this.productRepo.find({
            where: {
                subCategory: { id: In([ 5, 10, 15, 20, 25, 30, 35, 40 ]) }
            },
            relations: ['allSpecifications', 'description', 'reviews'],
            order: { id: 'DESC' },
            take: 8
        })
    }

    async getPopularProducts(): Promise<Product[]> {
        return await this.productRepo.query(`
            SELECT product.id, "imageUrl", title, company, "companyImage",
            model, "mainDescription", price, specification, "desc"
            FROM product
            JOIN (
                SELECT "productId", COUNT(*) AS cnt
                FROM product_likes
                GROUP BY "productId"
                ORDER BY cnt DESC
                LIMIT $1
            ) AS popular ON popular."productId" = product.id
            JOIN all_specifications ON all_specifications."productId" = product.id
            JOIN description ON description."productId" = product.id
        `, [8])
    }

    // by category 'motherboards', 'gpu', 'mobile peripherals' and etc.
    async getProducts(which: WhichProductDto): Promise<Product[]> {
        return await this.productRepo.query(`
            SELECT product."id", product."imageUrl", product.title,
            company, "companyImage", model, "mainDescription",
            price, product."categoryId", "subCategoryId",
            sub_category.title AS "mainTitle"
            FROM product
            JOIN sub_category ON sub_category."id" = product."subCategoryId"
            WHERE product."categoryId" = $1 AND product."subCategoryId" = $2
            LIMIT 4
        `, [which.category, which.subCategory])
    }

    async getBrands(): Promise<Brands[]> {
        return await this.brandsRepo.find()
    }

    async getByBrand(options: Options): Promise<Result> {
        const count = await this.productRepo.count({
            where: { company: options.company }
        })
        const entities = await this.productRepo.find({
            where: { company: options.company },
            order: { [options.by]: options.order },
            skip: options.skip,
            take: options.take
        })

        const meta = new Meta(options.page, options.take, count)
        return new Result(entities, meta)
    }
}
