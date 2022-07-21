import { User } from 'src/other/entities/user.entity'
import { Product } from 'src/product/entities/product.entity'
import {
    Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique
} from 'typeorm'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    text: string

    @Column('smallint')
    stars: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(
        () => Product,
        product => product.reviews,
        { onDelete: 'CASCADE' }
    )
    product: Product

    @Unique(['userId'])
    @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE' })
    user: User
}