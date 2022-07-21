import { Likes } from 'src/other/entities/likes.entity'
import {
    AllSpecifications
} from 'src/product/entities/all_specifications.entity'
import { Description } from 'src/product/entities/description.entity'
import { Review } from 'src/product/entities/review.entity'
import {
    Column, Entity, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './category.entity'
import { SubCategory } from './subCategory.entity'

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
        { onDelete: 'CASCADE' }
    )
    category: Category

    @ManyToOne(
        () => SubCategory,
        subCategory => subCategory.product,
        { onDelete: 'CASCADE' }
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

    @OneToMany(() => Likes, likes => likes.product)
    likes: Likes
}