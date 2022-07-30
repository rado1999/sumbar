import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Edit, Login, UserDto } from './dto/user.dto'
import { UsersService } from './users.service'
import { Request } from 'express'
import { Product } from 'src/product/entities/product.entity'
import { ProductReviews } from 'src/product/entities/product-reviews.entity'
import { Addresses } from './entities/addresses.entity'
import { AuthGuard } from 'src/auth/auth.guard'
import { AddressDto } from './dto/address.dto'
import { UpdateResult } from 'typeorm'

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post('login')
    async login(@Body() login: Login): Promise<any> {
        return await this.usersService.login(login)
    }

    @Post('create')
    async createUser(@Body() user: UserDto): Promise<any> {
        return await this.usersService.createUser(user)
    }

    @Get('refresh')
    refreshToken(@Req() req: Request): string {
        return this.usersService.refreshToken(req)
    }

    // codes below, are for user's page
    @UseGuards(AuthGuard)
    @Get('favorites')
    async getFavoritesProducts(@Req() req: any): Promise<Product[]> {
        return await this.usersService.getFavoritesProducts(req)
    }

    @UseGuards(AuthGuard)
    @Get('reviews')
    async getReviewsOfProducts(@Req() req: any): Promise<ProductReviews[]> {
        return await this.usersService.getReviewsOfProducts(req)
    }

    @UseGuards(AuthGuard)
    @Post('address')
    async createAddress(
        @Body() address: AddressDto,
        @Req() req: any
    ): Promise<void> {
        return this.usersService.createAddress(address, req)
    }

    @UseGuards(AuthGuard)
    @Get('address')
    async getAddresses(@Req() req: any): Promise<Addresses[]> {
        return await this.usersService.getAddresses(req)
    }

    @UseGuards(AuthGuard)
    @Post('edit')
    async editProfile(
        @Body() data: Edit,
        @Req() req: any
    ): Promise<UpdateResult> {
        return await this.usersService.editProfile(data, req)
    }
}
