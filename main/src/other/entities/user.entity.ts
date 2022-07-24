import { Review } from 'src/product/entities/review.entity'
import {
    SiteReviewsDislikes
} from 'src/site-reviews/entities/site-reviews-dislikes.entity'
import {
    SiteReviewsLikes
} from 'src/site-reviews/entities/site-reviews-likes.entity'
import { SiteReviews } from 'src/site-reviews/entities/site-reviews.entity'
import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm'
import { ProductLikes } from './likes.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    phone: string

    @Column()
    name: string

    @OneToMany(() => SiteReviews, siteReviews => siteReviews.user)
    siteReviews: SiteReviews

    @OneToMany(
        () => SiteReviewsLikes,
        siteReviewsLikes => siteReviewsLikes
    )
    siteReviewsLikes: SiteReviewsLikes

    @OneToMany(
        () => SiteReviewsDislikes,
        siteReviewsDislikes => siteReviewsDislikes
    )
    siteReviewsDislikes: SiteReviewsDislikes

    @OneToMany(() => Review, review => review.user)
    reviews: Review[]

    @OneToMany(() => ProductLikes, productLikes => productLikes.user)
    productLikes: ProductLikes
}