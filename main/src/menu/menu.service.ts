import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>
    ) { }

    async getCategory(): Promise<Category[]> {
        return await this.categoryRepo.find(
            { relations: ['subCategory'], order: { id: 'ASC' } }
        )
    }
}
