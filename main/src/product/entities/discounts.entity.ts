import {
    Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn
} from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class Discounts {
    @PrimaryGeneratedColumn()
    id: number

    @Column('real')
    original_price: number

    @Column('int')
    discount: number

    @Column('real')
    total_price: number

    @OneToOne(
        () => Product,
        product => product.discounts,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn()
    product: Product
}