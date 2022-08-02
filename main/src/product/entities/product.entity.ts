import { Category } from 'src/menu/entities/category.entity'
import { SubCategory } from 'src/menu/entities/subCategory.entity'
import { ProductLikes } from 'src/product/entities/likes.entity'
import {
    AllSpecifications
} from 'src/product/entities/all_specifications.entity'
import { Description } from 'src/product/entities/description.entity'
import { ProductReviews } from 'src/product/entities/product-reviews.entity'
import {
    Column, Entity, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn } from 'typeorm'
import { Discounts } from './discounts.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', { array: true, nullable: true })
    imageUrl: string[]

    @Column()
    title: string

    @Column({ nullable: true })
    company: string

    @Column({ nullable: true })
    companyImage: string

    @Column({ nullable: true })
    model: string

    @Column('text', { nullable: true })
    mainDescription: string

    @Column('real', { nullable: true })
    price: number

    @ManyToOne(
        () => Category,
        category => category.product,
        { onDelete: 'SET NULL' }
    )
    category: Category

    @ManyToOne(
        () => SubCategory,
        subCategory => subCategory.product,
        { onDelete: 'SET NULL' }
    )
    subCategory: SubCategory

    @OneToOne(
        () => AllSpecifications,
        allSpecifications => allSpecifications.product
    )
    allSpecifications: AllSpecifications

    @OneToOne(
        () => Description,
        description => description.product
    )
    description: Description

    @OneToMany(() => ProductReviews, review => review.product)
    reviews: ProductReviews[]

    @OneToMany(() => ProductLikes, likes => likes.product)
    likes: ProductLikes

    @OneToOne(() => Discounts, discounts => discounts.product)
    discounts: Discounts
}