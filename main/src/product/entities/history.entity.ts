import { User } from 'src/users/entities/user.entity'
import {
    Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @Column('real')
    total: number

    @Column('real')
    payment: number

    @Column({ nullable: true })
    status: string

    @ManyToOne(() => User, user => user.history, { onDelete: 'CASCADE' })
    user: User
}