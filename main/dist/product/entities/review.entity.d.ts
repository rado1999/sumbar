import { User } from 'src/other/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
export declare class Review {
    id: number;
    text: string;
    stars: number;
    createdAt: Date;
    product: Product;
    user: User;
}
