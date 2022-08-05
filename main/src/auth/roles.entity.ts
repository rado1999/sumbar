import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Admin } from './admin.entity'

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    role: string

    @OneToMany(() => Admin, admin => admin.role)
    admin: Admin
}