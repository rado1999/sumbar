import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/product/entities/product.entity'
import { Repository } from 'typeorm'
import { WhichProductDto } from './dto/which-product.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>
    ) { }

    async getCategory(): Promise<Category[]> {
        return await this.categoryRepo.find(
            { relations: ['subCategory'], order: { id: 'ASC' } }
        )
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
}
