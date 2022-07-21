import {
    Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards
} from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { Options } from './dto/options.dto'
import { Result } from './dto/result.dto'
import { ProductCreateDto, WhichProductDto } from './dto/product.dto'
import { ReviewDto } from './dto/review.dto'
import { Category } from './entities/category.entity'
import { Product } from './entities/product.entity'
import { Review } from './entities/review.entity'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Get('all')
    async getProducts(@Query() options: Options): Promise<Result> {
        return await this.productService.getProducts(options)
    }

    @Get('item/:id')
    async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return await this.productService.getProduct(id)
    }

    @Get('category')
    async getCategory(): Promise<Category[]> {
        return await this.productService.getCategory()
    }

    @Get()
    async getByCategory(@Query() which: WhichProductDto): Promise<Product[]> {
        return await this.productService.getByCategory(which)
    }

    @Get('big_images')
    getBigImages(): string[] {
        return [
            'http://localhost:3000/big_images/1.jpg',
            'http://localhost:3000/big_images/2.jpg',
            'http://localhost:3000/big_images/3.jpg',
            'http://localhost:3000/big_images/4.jpg',
            'http://localhost:3000/big_images/5.jpg',
            'http://localhost:3000/big_images/6.jpg',
            'http://localhost:3000/big_images/7.jpg',
        ]
    }

    @Get('small_images')
    async getSmallImages(): Promise<Product[]> {
        return await this.productService.getSmallImages()
    }

    @Post('create')
    async createProduct(@Body() product: ProductCreateDto): Promise<string> {
        return await this.productService.createProduct(product)
    }

    @UseGuards(AuthGuard)
    @Post('review')
    async createReview(
        @Body() review: ReviewDto, @Req() req: any
    ): Promise<void> {
        return await this.productService.createReview(review, req)
    }

    @UseGuards(AuthGuard)
    @Get('reviews')
    async getReviews(): Promise<Review[]> {
        return await this.productService.getReviews()
    }

    @UseGuards(AuthGuard)
    @Get('review/:id')
    async getReview(@Param('id', ParseIntPipe) id: number): Promise<Review> {
        return await this.productService.getReview(id)
    }
}
