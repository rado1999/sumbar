import { Review } from 'src/product/entities/review.entity'
import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm'
import { Likes } from './likes.entity'

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

    @OneToMany(() => Review, review => review.user)
    reviews: Review[]

    @OneToMany(() => Likes, likes => likes.user)
    likes: Likes
}