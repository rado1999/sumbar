import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { AllSpecifications } from './entities/all_specifications.entity'
import { Category } from './entities/category.entity'
import { Description } from './entities/description.entity'
import { Product } from './entities/product.entity'
import { Review } from './entities/review.entity'
import { SubCategory } from './entities/subCategory.entity'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            Product,
            Category,
            SubCategory,
            AllSpecifications,
            Description,
            Review
        ]
        )
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }
