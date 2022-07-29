import { Controller, Get, Query } from '@nestjs/common'
import { WhichProductDto } from 'src/menu/dto/which-product.dto'
import { Product } from 'src/product/entities/product.entity'
import { Options } from './dto/options.dto'
import { Result } from './dto/result.dto'
import { Brands } from './entities/brands.entity'
import { MainPageService } from './main-page.service'

@Controller('main-page')
export class MainPageController {
    constructor(
        private readonly mainPageService: MainPageService
    ) {}

    @Get('big-images')
    getBigImages(): string[] {
        return [
            'http://95.85.127.250:3002/big_images/1.jpg',
            'http://95.85.127.250:3002/big_images/2.jpg',
            'http://95.85.127.250:3002/big_images/3.jpg',
            'http://95.85.127.250:3002/big_images/4.jpg',
            'http://95.85.127.250:3002/big_images/5.jpg',
            'http://95.85.127.250:3002/big_images/6.jpg',
            'http://95.85.127.250:3002/big_images/7.jpg',
        ]
    }

    @Get('small-images')
    async getSmallImages(): Promise<Product[]> {
        return await this.mainPageService.getSmallImages()
    }

    @Get('new')
    async getNewProducts(): Promise<Product[]> {
        return await this.mainPageService.getNewProducts()
    }

    @Get('popular')
    async getPopularProducts(): Promise<Product[]> {
        return await this.mainPageService.getPopularProducts()
    }

    @Get('categories')
    async getProducts(@Query() which: WhichProductDto): Promise<Product[]> {
        return await this.mainPageService.getProducts(which)
    }

    @Get('brands')
    async getBrands(): Promise<Brands[]> {
        return await this.mainPageService.getBrands()
    }

    @Get('by-brand')
    async getByBrand(@Query() options: Options): Promise<Result> {
        return await this.mainPageService.getByBrand(options)
    }
}
