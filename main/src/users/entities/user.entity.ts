import { ProductReviews } from 'src/product/entities/product-reviews.entity'
import {
    SiteReviewsDislikes
} from 'src/site-reviews/entities/site-reviews-dislikes.entity'
import {
    SiteReviewsLikes
} from 'src/site-reviews/entities/site-reviews-likes.entity'
import { SiteReviews } from 'src/site-reviews/entities/site-reviews.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductLikes } from '../../product/entities/likes.entity'
import { Addresses } from './addresses.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
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

    @OneToMany(() => ProductReviews, review => review.user)
    reviews: ProductReviews[]

    @OneToMany(() => ProductLikes, likes => likes.user)
    likes: ProductLikes

    @OneToMany(() => Addresses, address => address.user)
    address: Addresses
}