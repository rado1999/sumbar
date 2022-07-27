import { Product } from 'src/product/entities/product.entity'
import { User } from 'src/users/entities/user.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ProductLikes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(
        () => Product,
        product => product.likes,
        { onDelete: 'CASCADE' }
    )
    product: Product
}