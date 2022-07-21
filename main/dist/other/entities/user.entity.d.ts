import { Review } from 'src/product/entities/review.entity';
import { Likes } from './likes.entity';
export declare class User {
    id: number;
    email: string;
    phone: string;
    name: string;
    reviews: Review[];
    likes: Likes;
}
