import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/product/entities/product.entity'
import { In, Repository } from 'typeorm'

@Injectable()
export class MainPageService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>
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
}
