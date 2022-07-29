import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ nullable: false })
    emailOrPhone: string

    @Column()
    message: string
}