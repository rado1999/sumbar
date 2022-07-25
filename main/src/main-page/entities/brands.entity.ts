import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Brands {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    company: string

    @Column()
    logo: string
}