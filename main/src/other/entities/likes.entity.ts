import { Product } from 'src/product/entities/product.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class ProductLikes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.productLikes, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(
        () => Product,
        product => product.productLikes,
        { onDelete: 'CASCADE' }
    )
    product: Product
}