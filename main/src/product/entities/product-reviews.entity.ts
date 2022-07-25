import { User } from 'src/other/entities/user.entity'
import { Product } from 'src/product/entities/product.entity'
import {
    Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class ProductReviews {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    text: string

    @Column('smallint')
    stars: number

    @ManyToOne(
        () => Product,
        product => product.reviews,
        { onDelete: 'CASCADE' }
    )
    product: Product

    @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE' })
    user: User
}