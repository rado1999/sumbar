import { User } from 'src/users/entities/user.entity'
import {
    Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm'
import { SiteReviewsDislikes } from './site-reviews-dislikes.entity'
import { SiteReviewsLikes } from './site-reviews-likes.entity'

@Entity()
export class SiteReviews {
    @PrimaryGeneratedColumn()
    id: number

    @Column('smallint')
    stars: number

    @Column()
    review: string

    @Column()
    status: string

    @ManyToOne(
        () => User,
        user => user.siteReviews,
        { onDelete: 'CASCADE' }
    )
    user: User

    @OneToMany(
        () => SiteReviewsLikes,
        siteReviewsLikes => siteReviewsLikes
    )
    likes: SiteReviewsLikes

    @OneToMany(
        () => SiteReviewsDislikes,
        siteReviewsDislikes => siteReviewsDislikes
    )
    dislikes: SiteReviewsDislikes
}