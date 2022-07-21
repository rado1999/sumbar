import { BaseEntity } from 'typeorm';
export declare class Password extends BaseEntity {
    id: number;
    phone: string;
    password: string;
}
