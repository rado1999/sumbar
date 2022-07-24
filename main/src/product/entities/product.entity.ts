import { Category } from 'src/menu/entities/category.entity'
import { SubCategory } from 'src/menu/entities/subCategory.entity'
import { ProductLikes } from 'src/other/entities/likes.entity'
import {
    AllSpecifications
} from 'src/product/entities/all_specifications.entity'
import { Description } from 'src/product/entities/description.entity'
import { Review } from 'src/product/entities/review.entity'
import {
    Column, Entity, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn } from 'typeorm'

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

    @OneToMany(() => Review, review => review.product)
    reviews: Review[]

    @OneToMany(() => ProductLikes, productLikes => productLikes.product)
    productLikes: ProductLikes
}