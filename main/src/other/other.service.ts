import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LikesDto } from './dto/likes.dto'
import { UserDto } from './dto/user.dto'
import { ProductLikes } from './entities/likes.entity'
import { User } from './entities/user.entity'
import { config } from 'dotenv'
import { Request } from 'express'

config()

@Injectable()
export class OtherService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(ProductLikes)
        private readonly likesRepo: Repository<ProductLikes>,
        private readonly jwtService: JwtService
    ) { }

    async createUser(user: UserDto): Promise<string> {
        const currentUser = await this.userRepo.findOne({
            where: { email: user.email }
        })
        if (!currentUser) {
            const newUser = this.userRepo.create(user)
            await this.userRepo.save(newUser)
            return this.createTokens(newUser.id)
        }

        return this.createTokens(currentUser.id)
    }

    async createLike(like: LikesDto, req: any): Promise<void> {
        const result = await this.likesRepo.query(
            `SELECT * FROM likes WHERE "userId" = $1`, [req.userId]
        )
        if (result.length)
            throw new BadRequestException('already has been liked')
        const like_ = this.likesRepo.create({
            user: req.userId,
            product: like.product
        })

        await this.likesRepo.save(like_)
        return
    }

    async getLikes(): Promise<ProductLikes[]> {
        return await this.likesRepo.find({
            relations: ['user', 'product']
        })
    }

    async getLike(id: number): Promise<ProductLikes> {
        const result = await this.likesRepo.findOne({
            where: { product: { id: id } },
            relations: ['user', 'product']
        })

        if (!result) throw new NotFoundException()
        return result
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
}
