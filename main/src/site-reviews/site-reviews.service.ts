import {
    BadRequestException, Injectable, NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateSiteReviewsDto } from './dto/site-reviews.dto'
import { SiteReviewsDislikes } from './entities/site-reviews-dislikes.entity'
import { SiteReviewsLikes } from './entities/site-reviews-likes.entity'
import { SiteReviews } from './entities/site-reviews.entity'

@Injectable()
export class SiteReviewsService {
    constructor(
        @InjectRepository(SiteReviews)
        private readonly siteReviewsRepo: Repository<SiteReviews>,
        @InjectRepository(SiteReviewsLikes)
        private readonly siteReviewsLikesRepo: Repository<SiteReviewsLikes>,
        @InjectRepository(SiteReviewsDislikes)
        private readonly siteReviewsDislikeRepo: Repository<SiteReviewsDislikes>
    ) { }

    async createSiteReview(
        data: CreateSiteReviewsDto,
        req: any
    ): Promise<void> {
        const review = this.siteReviewsRepo.create(data)
        review.user = req.userId
        await this.siteReviewsRepo.save(review)
    }

    async getSiteReviews(): Promise<[SiteReviews[], number]> {
        const count = await this.siteReviewsRepo.count()
        const entities = await this.siteReviewsRepo.query(`
            SELECT site_reviews.id, stars, "User".name, review
            FROM site_reviews
            JOIN "user" "User" ON "User".id = site_reviews."userId"
            ORDER BY site_reviews.id DESC
            LIMIT 5
        `)

        return [entities, count]
    }

    async getAllReviews(): Promise<SiteReviews[]> {
        return await this.siteReviewsRepo.query(`
            SELECT site_reviews.id, stars, "User".name, review, likes, dislikes
            FROM site_reviews
            JOIN "user" "User" ON "User".id = site_reviews."userId"
            JOIN (
                SELECT "siteReviewsId", COUNT(*) AS likes
                FROM site_reviews_likes
                GROUP BY "siteReviewsId"
            ) AS review_likes ON review_likes."siteReviewsId" = site_reviews.id
            JOIN (
                SELECT "siteReviewsId", COUNT(*) AS dislikes
                FROM site_reviews_dislikes
                GROUP BY "siteReviewsId"
            ) AS review_dislikes ON review_dislikes."siteReviewsId" = site_reviews.id
            ORDER BY site_reviews.id DESC
        `)
    }

    async createSiteReviewLike(id: any, req: any): Promise<void> {
        await this.likeOrDislike(
            id,
            req.userId,
            this.siteReviewsLikesRepo,
            'site_reviews_likes',
            'liked'
        )
    }

    async createSiteReviewDislike(id: any, req: any): Promise<void> {
        await this.likeOrDislike(
            id,
            req.userId,
            this.siteReviewsDislikeRepo,
            'site_reviews_dislikes',
            'disliked'
        )
    }

    async removeSiteReviewLike(id: any, req: any): Promise<DeleteResult> {
        return await this.siteReviewsLikesRepo.delete({
            siteReviews: id,
            user: req.userId
        })
    }

    async removeSiteReviewDislike(id: any, req: any): Promise<DeleteResult> {
        return await this.siteReviewsDislikeRepo.delete({
            siteReviews: id,
            user: req.userId
        })
    }

    private async likeOrDislike(
        id: any,
        userId: any,
        repo: any,
        table: string,
        message: string
    ): Promise<void> {
        const reviewExist = await this.siteReviewsRepo.findOne({
            where: { id }
        })

        if (!reviewExist) throw new NotFoundException()

        const isRepeat = await repo.query(
            'SELECT "siteReviewsId" + "userId" AS sum ' +
            `FROM ${table} ` +
            'WHERE "userId" = $1 AND "siteReviewsId" = $2', [userId, id]
        )

        if (isRepeat[0] && isRepeat[0].sum === userId + id)
            throw new BadRequestException(`This user has already ${message}`)

        const likeOrDislike = repo.create()
        likeOrDislike.siteReviews = id
        likeOrDislike.user = userId
        await repo.save(likeOrDislike)
    }
}
