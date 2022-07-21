import { Category } from './category.entity';
import { Product } from './product.entity';
export declare class SubCategory {
    id: number;
    title: string;
    imageUrl: string;
    product: Product;
    category: Category;
}
