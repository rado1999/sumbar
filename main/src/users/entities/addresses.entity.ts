import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Addresses {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @ManyToOne(() => User, user => user.address, { onDelete: 'CASCADE' })
    user: User
}