import { Product } from 'src/product/entities/product.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id: number

    @Unique(['userId'])
    @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Product, product => product.likes, { onDelete: 'CASCADE' })
    product: Product
}