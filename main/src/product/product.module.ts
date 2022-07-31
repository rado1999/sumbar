import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { AllSpecifications } from './entities/all_specifications.entity'
import { Description } from './entities/description.entity'
import { ProductLikes } from './entities/likes.entity'
import { Product } from './entities/product.entity'
import { ProductReviews } from './entities/product-reviews.entity'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { History } from './entities/history.entity'
import { User } from 'src/users/entities/user.entity'

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            Product,
            AllSpecifications,
            Description,
            ProductReviews,
            ProductLikes,
            History,
            User
        ]
        )
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }
