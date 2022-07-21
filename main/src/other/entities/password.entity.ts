import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Password extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    phone: string

    @Column()
    password: string
}