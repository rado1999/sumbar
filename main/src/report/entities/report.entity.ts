import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    email: string

    @Column()
    message: string
}