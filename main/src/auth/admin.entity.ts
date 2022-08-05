import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Roles } from './roles.entity'

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    login: string

    @Column()
    password: string

    @ManyToOne(() => Roles, roles => roles.admin, { onDelete: 'CASCADE' })
    role: string
}