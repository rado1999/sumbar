import { Controller, Get } from '@nestjs/common'
import { Product } from 'src/product/entities/product.entity'
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
}
