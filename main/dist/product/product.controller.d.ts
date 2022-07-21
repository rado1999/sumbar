import { Options } from './dto/options.dto';
import { Result } from './dto/result.dto';
import { ProductCreateDto, WhichProductDto } from './dto/product.dto';
import { ReviewDto } from './dto/review.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts(options: Options): Promise<Result>;
    getProduct(id: number): Promise<Product>;
    getCategory(): Promise<Category[]>;
    getByCategory(which: WhichProductDto): Promise<Product[]>;
    getBigImages(): string[];
    getSmallImages(): Promise<Product[]>;
    createProduct(product: ProductCreateDto): Promise<string>;
    createReview(review: ReviewDto, req: any): Promise<void>;
    getReviews(): Promise<Review[]>;
    getReview(id: number): Promise<Review>;
}
