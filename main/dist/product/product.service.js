"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const result_dto_1 = require("./dto/result.dto");
const category_entity_1 = require("./entities/category.entity");
const product_entity_1 = require("./entities/product.entity");
const review_entity_1 = require("./entities/review.entity");
let ProductService = class ProductService {
    constructor(productRepo, categoryRepo, reviewRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
        this.reviewRepo = reviewRepo;
    }
    async getProducts(options) {
        const itemsCount = await this.productRepo.count();
        const entities = await this.productRepo.find({
            order: { [options.by]: options.order },
            skip: options.skip,
            take: options.take
        });
        const meta = new result_dto_1.Meta(options.page, options.take, itemsCount);
        return new result_dto_1.Result(entities, meta);
    }
    async getProduct(id) {
        const result = await this.productRepo.findOne({
            where: { id: id },
            relations: ['allSpecifications', 'description', 'reviews']
        });
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
    async getCategory() {
        return await this.categoryRepo.find({ relations: ['subCategory'], order: { id: 'ASC' } });
    }
    async getByCategory(which) {
        const result = await this.productRepo.find({
            where: {
                category: { id: which.category },
                subCategory: { id: which.subCategory }
            }
        });
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
    async getSmallImages() {
        return await this.productRepo.find({ take: 8 });
    }
    async createProduct(product) {
        const product_ = this.productRepo.create(product);
        await this.productRepo.save(product_);
        return 'Has been created';
    }
    async createReview(review, req) {
        const user = await this.reviewRepo.findOne({
            where: { user: req.userId }
        });
        if (user)
            throw new common_1.BadRequestException('This user has already written review');
        const review_ = this.reviewRepo.create(review);
        review_.user = req.userId;
        await this.reviewRepo.save(review_);
    }
    async getReviews() {
        return await this.reviewRepo.find({
            relations: ['product', 'user']
        });
    }
    async getReview(id) {
        const result = await this.reviewRepo.findOne({
            where: { product: { id: id } },
            relations: ['product', 'user']
        });
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map