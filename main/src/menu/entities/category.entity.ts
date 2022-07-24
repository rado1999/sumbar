import { Product } from 'src/product/entities/product.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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