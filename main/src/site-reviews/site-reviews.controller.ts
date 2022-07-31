import {
    Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards
} from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { DeleteResult } from 'typeorm'
import { CreateSiteReviewsDto } from './dto/site-reviews.dto'
import { SiteReviews } from './entities/site-reviews.entity'
import { SiteReviewsService } from './site-reviews.service'

@Controller('site-reviews')
export class SiteReviewsController {
    constructor(
        private readonly siteReviewsService: SiteReviewsService
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    async createSiteReview(
        @Body() data: CreateSiteReviewsDto,
        @Req() req: any
    ): Promise<void> {
        return await this.siteReviewsService.createSiteReview(data, req)
    }

    @Get()
    async getSiteReviews(): Promise<[SiteReviews[], number, string]> {
        return await this.siteReviewsService.getSiteReviews()
    }

    @Get('all')
    async getAllReviews(): Promise<[SiteReviews[], number, string]> {
        return await this.siteReviewsService.getAllReviews()
    }

    @UseGuards(AuthGuard)
    @Post('like/:id')
    async createSiteReviewLike(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any
    ): Promise<void> {
        return await this.siteReviewsService.createSiteReviewLike(id, req)
    }

    @UseGuards(AuthGuard)
    @Post('dislike/:id')
    async createSiteReviewDislike(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any
    ): Promise<void> {
        return await this.siteReviewsService.createSiteReviewDislike(id, req)
    }

    @UseGuards(AuthGuard)
    @Delete('like/:id')
    async removeSiteReviewLike(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any
    ): Promise<DeleteResult> {
        return await this.siteReviewsService.removeSiteReviewLike(id, req)
    }

    @UseGuards(AuthGuard)
    @Delete('dislike/:id')
    async removeSiteReviewDislike(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any
    ): Promise<DeleteResult> {
        return await this.siteReviewsService.removeSiteReviewDislike(id, req)
    }
}
