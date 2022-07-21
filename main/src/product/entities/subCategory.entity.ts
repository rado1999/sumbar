import {
    Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm'
import { Category } from './category.entity'
import { Product } from './product.entity'

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    imageUrl: string

    @OneToMany(() => Product, product => product.subCategory)
    product: Product

    @ManyToOne(
        () => Category,
        category => category.subCategory,
        { onDelete: 'CASCADE' }
    )
    category: Category
}