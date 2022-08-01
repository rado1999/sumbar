import {
    Body, Controller, Delete, Get, Param,
    ParseIntPipe, Post, Query, Req, UseGuards
} from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { Options } from './dto/options.dto'
import { Result } from './dto/result.dto'
import { BuyProductDto, ProductCreateDto } from './dto/product.dto'
import { ReviewDto } from './dto/review.dto'
import { Product } from './entities/product.entity'
import { ProductReviews } from './entities/product-reviews.entity'
import { ProductService } from './product.service'
import { DeleteResult } from 'typeorm'
import { History } from './entities/history.entity'
import { Search } from './dto/search.dto'

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

    // get the reviews only of one product
    @Get('reviews/:id')
    async getReviews(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProductReviews[]> {
        return await this.productService.getReviews(id)
    }

    @Get('similar/:id')
    async getSimilarProduct(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Product[]> {
        return await this.productService.getSimilarProducts(id)
    }

    @UseGuards(AuthGuard)
    @Post('like/:id')
    async like(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any
    ): Promise<void> {
        return await this.productService.like(id, req)
    }

    @UseGuards(AuthGuard)
    @Delete('like/:id')
    async unlike(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any
    ): Promise<DeleteResult> {
        return await this.productService.unlike(id, req)
    }

    @Post('buy')
    async buyProduct(@Body() buy: BuyProductDto): Promise<void> {
        return this.productService.buyProduct(buy)
    }

    @UseGuards(AuthGuard)
    @Get('history')
    async getHistory(@Req() req: any): Promise<History[]> {
        return await this.productService.getHistory(req)
    }

    @Get('search')
    async search(@Query() query: Search): Promise<Product[]> {
        return await this.productService.search(query)
    }
}
