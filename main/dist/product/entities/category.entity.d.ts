import { Product } from './product.entity';
import { SubCategory } from './subCategory.entity';
export declare class Category {
    id: number;
    title: string;
    imageUrl: string;
    product: Product;
    subCategory: SubCategory;
}
