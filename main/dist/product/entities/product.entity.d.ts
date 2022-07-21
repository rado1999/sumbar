import { Likes } from 'src/other/entities/likes.entity';
import { AllSpecifications } from 'src/product/entities/all_specifications.entity';
import { Description } from 'src/product/entities/description.entity';
import { Review } from 'src/product/entities/review.entity';
import { Category } from './category.entity';
import { SubCategory } from './subCategory.entity';
export declare class Product {
    id: number;
    imageUrl: string[];
    title: string;
    company: string;
    companyImage: string;
    model: string;
    mainDescription: string;
    price: number;
    category: Category;
    subCategory: SubCategory;
    allSpecifications: AllSpecifications;
    description: Description;
    reviews: Review[];
    likes: Likes;
}
