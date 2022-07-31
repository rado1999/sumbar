import {
    BadRequestException, Injectable, NotFoundException, UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Edit, Login, UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import { config } from 'dotenv'
import { Product } from 'src/product/entities/product.entity'
import { ProductReviews } from 'src/product/entities/product-reviews.entity'
import { Addresses } from './entities/addresses.entity'
import { AddressDto } from './dto/address.dto'

config()

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(ProductReviews)
        private readonly productReviewsRepo: Repository<ProductReviews>,
        @InjectRepository(Addresses)
        private readonly addressesRepo: Repository<Addresses>,
        private readonly jwtService: JwtService
    ) { }

    async login(login: Login): Promise<any> {
        const user = await this.usersRepo.findOne({ where: { id: login.id } })
        if (!user) throw new NotFoundException()

        return this.createTokens(user.id)
    }

    async createUser(user: UserDto): Promise<any> {
        const currentUser = await this.usersRepo.findOne({
            where: [{ email: user.email }, { phone: user.phone }]
        })

        if (currentUser) throw new BadRequestException(
            'This email or phone is already exist'
        )

        const newUser = this.usersRepo.create(user)
        await this.usersRepo.save(newUser)
        return this.createTokens(newUser.id)
    }

    private createTokens(id: number): any {
        const accessToken = this.createToken(
            process.env.RANDOM_INFO,
            process.env.ACCESS_TOKEN,
            process.env.ACCESS_TIME,
            id
        )

        const refreshToken = this.createToken(
            process.env.RANDOM_INFO,
            process.env.REFRESH_TOKEN,
            process.env.REFRESH_TIME,
            id
        )

        return { accessToken, refreshToken }
    }

    private createToken(
        randomInfo: string,
        secretKey: string,
        time: string,
        id: number
    ): string {
        return this.jwtService.sign({
            userId: id,
            someRandomInfo: randomInfo
        }, {
            secret: secretKey,
            expiresIn: time,
        })
    }

    refreshToken(req: Request): string {
        try {
            const token = req.headers.authorization.split('Bearer ')[1]
            const result = this.jwtService.verify(token, {
                secret: process.env.REFRESH_TOKEN,
            })
            return this.createToken(
                process.env.RANDOM_INFO,
                process.env.ACCESS_TOKEN,
                process.env.ACCESS_TIME,
                result.userId
            )
        } catch {
            throw new UnauthorizedException()
        }
    }

    // codes below, are for user's page
    async getFavoritesProducts(req: any): Promise<Product[]> {
        return await this.productRepo.query(`
            SELECT product.id, "imageUrl", title, price
            FROM product
            JOIN product_likes ON product_likes."productId" = product.id
            WHERE product_likes."userId" = $1
        `, [req.userId])
    }

    async getReviewsOfProducts(req: any): Promise<ProductReviews[]> {
        return await this.productReviewsRepo.query(`
            SELECT product_reviews."id", "text", stars, title, "name"
            FROM product_reviews
            JOIN product ON product.id = product_reviews."productId"
            JOIN "user" "User" ON "User".id = product_reviews."userId"
            WHERE product_reviews."userId" = $1
        `, [req.userId])
    }

    async createAddress(address: AddressDto, req: any): Promise<void> {
        const address_ = this.addressesRepo.create(address)
        address_.user = req.userId
        await this.addressesRepo.save(address_)
    }

    async getAddresses(req: any): Promise<Addresses[]> {
        return await this.addressesRepo.find({
            where: { user: { id: req.userId } }
        })
    }

    async deleteAddress(id: number, req: any): Promise<DeleteResult> {
        return await this.addressesRepo.delete({
            id,
            user: req.userId
        })
    }

    async editProfile(data: Edit, req: any): Promise<UpdateResult> {
        return await this.usersRepo.update({ id: req.userId }, data)
    }
}
