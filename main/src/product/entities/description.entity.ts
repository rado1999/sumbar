import { Product } from 'src/product/entities/product.entity'
import {
    Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Description {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { default: null })
    desc: string

    @OneToOne(
        () => Product,
        product => product.description,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn()
    product: Product
}