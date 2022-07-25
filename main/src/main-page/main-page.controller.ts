import { Controller, Get, Query } from '@nestjs/common'
import { Product } from 'src/product/entities/product.entity'
import { Options } from './dto/options.dto'
import { Result } from './dto/result.dto'
import { Brands } from './entities/brands.entity'
import { MainPageService } from './main-page.service'

@Controller('main-page')
export class MainPageController {
    constructor(
        private readonly mainPageService: MainPageService
    ) { }

    @Get('big-images')
    getBigImages(): string[] {
        return [
            'http://localhost:3002/big_images/1.jpg',
            'http://localhost:3002/big_images/2.jpg',
            'http://localhost:3002/big_images/3.jpg',
            'http://localhost:3002/big_images/4.jpg',
            'http://localhost:3002/big_images/5.jpg',
            'http://localhost:3002/big_images/6.jpg',
            'http://localhost:3002/big_images/7.jpg',
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
    async getProducts(): Promise<Product[]> {
        return await this.mainPageService.getProducts()
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
