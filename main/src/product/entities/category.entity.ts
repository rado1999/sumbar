import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity'
import { SubCategory } from './subCategory.entity'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    imageUrl: string

    @OneToMany(() => Product, product => product.category)
    product: Product

    @OneToMany(() => SubCategory, subCategory => subCategory.category)
    subCategory: SubCategory
}