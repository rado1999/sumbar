import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { ProductReviews } from 'src/product/entities/product-reviews.entity'
import { Product } from 'src/product/entities/product.entity'
import { Addresses } from './entities/addresses.entity'
import { Password } from './entities/password.entity'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User, Password, Addresses, Product, ProductReviews
        ]),
        JwtModule.register({}),
        AuthModule
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule { }
