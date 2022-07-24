import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { SiteReviewsDislikes } from './entities/site-reviews-dislikes.entity'
import { SiteReviewsLikes } from './entities/site-reviews-likes.entity'
import { SiteReviews } from './entities/site-reviews.entity'
import { SiteReviewsController } from './site-reviews.controller'
import { SiteReviewsService } from './site-reviews.service'

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            SiteReviews,
            SiteReviewsLikes,
            SiteReviewsDislikes
        ])
    ],
    controllers: [SiteReviewsController],
    providers: [SiteReviewsService]
})
export class SiteReviewsModule { }
