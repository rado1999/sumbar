import { Product } from 'src/product/entities/product.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class AllSpecifications {
    @PrimaryGeneratedColumn()
    id: number

    @Column('json')
    specification: any

    @OneToOne(
        () => Product,
        product => product.allSpecifications,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn()
    product: Product
}