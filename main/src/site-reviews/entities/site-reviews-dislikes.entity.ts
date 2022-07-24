import { User } from 'src/other/entities/user.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { SiteReviews } from './site-reviews.entity'

@Entity()
export class SiteReviewsDislikes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => SiteReviews,
        siteReviews => siteReviews.dislikes,
        { onDelete: 'CASCADE' }
    )
    siteReviews: SiteReviews

    @ManyToOne(() => User, user => user.siteReviewsDislikes)
    user: User
}