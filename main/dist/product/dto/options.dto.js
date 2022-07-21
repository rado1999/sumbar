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
exports.Options = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order || (Order = {}));
var By;
(function (By) {
    By["PRICE"] = "price";
    By["ID"] = "id";
})(By || (By = {}));
class Options {
    constructor() {
        this.order = Order.DESC;
        this.page = 1;
        this.take = 40;
        this.by = By.ID;
    }
    get skip() {
        return (this.page - 1) * this.take;
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(Order),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Options.prototype, "order", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Options.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Options.prototype, "take", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(By),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Options.prototype, "by", void 0);
exports.Options = Options;
//# sourceMappingURL=options.dto.js.map