import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Discounts {
    @PrimaryGeneratedColumn()
    id: number    
}