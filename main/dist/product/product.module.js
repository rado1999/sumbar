"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const all_specifications_entity_1 = require("./entities/all_specifications.entity");
const category_entity_1 = require("./entities/category.entity");
const description_entity_1 = require("./entities/description.entity");
const product_entity_1 = require("./entities/product.entity");
const review_entity_1 = require("./entities/review.entity");
const subCategory_entity_1 = require("./entities/subCategory.entity");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.Product,
                category_entity_1.Category,
                subCategory_entity_1.SubCategory,
                all_specifications_entity_1.AllSpecifications,
                description_entity_1.Description,
                review_entity_1.Review
            ])
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map