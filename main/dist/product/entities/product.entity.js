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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const likes_entity_1 = require("../../other/entities/likes.entity");
const all_specifications_entity_1 = require("./all_specifications.entity");
const description_entity_1 = require("./description.entity");
const review_entity_1 = require("./review.entity");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const subCategory_entity_1 = require("./subCategory.entity");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "companyImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "mainDescription", void 0);
__decorate([
    (0, typeorm_1.Column)('real', { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.product, { onDelete: 'CASCADE' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subCategory_entity_1.SubCategory, subCategory => subCategory.product, { onDelete: 'CASCADE' }),
    __metadata("design:type", subCategory_entity_1.SubCategory)
], Product.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => all_specifications_entity_1.AllSpecifications, allSpecifications => allSpecifications.product),
    __metadata("design:type", all_specifications_entity_1.AllSpecifications)
], Product.prototype, "allSpecifications", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => description_entity_1.Description, description => description.product),
    __metadata("design:type", description_entity_1.Description)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, review => review.product),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likes_entity_1.Likes, likes => likes.product),
    __metadata("design:type", likes_entity_1.Likes)
], Product.prototype, "likes", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map