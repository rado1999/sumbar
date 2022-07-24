import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/product/entities/product.entity'
import { In, Repository } from 'typeorm'

@Injectable()
export class MainPageService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
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
}
