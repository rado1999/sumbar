import { Product } from 'src/product/entities/product.entity';
import { User } from './user.entity';
export declare class Likes {
    id: number;
    user: User;
    product: Product;
}
