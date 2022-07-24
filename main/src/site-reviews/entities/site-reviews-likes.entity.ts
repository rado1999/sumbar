import { User } from 'src/other/entities/user.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { SiteReviews } from './site-reviews.entity'

@Entity()
export class SiteReviewsLikes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => SiteReviews,
        siteReviews => siteReviews.likes,
        { onDelete: 'CASCADE' }
    )
    siteReviews: SiteReviews

    @ManyToOne(() => User, user => user.siteReviewsLikes)
    user: User
}