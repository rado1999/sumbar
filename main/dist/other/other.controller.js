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
exports.OtherController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const likes_dto_1 = require("./dto/likes.dto");
const user_dto_1 = require("./dto/user.dto");
const other_service_1 = require("./other.service");
let OtherController = class OtherController {
    constructor(otherService) {
        this.otherService = otherService;
    }
    async createUser(user) {
        return await this.otherService.createUser(user);
    }
    async createLike(like, req) {
        return await this.otherService.createLike(like, req);
    }
    async getLikes() {
        return await this.otherService.getLikes();
    }
    async getLike(id) {
        return await this.otherService.getLike(id);
    }
    refreshToken(req) {
        return this.otherService.refreshToken(req);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OtherController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('like'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [likes_dto_1.LikesDto, Object]),
    __metadata("design:returntype", Promise)
], OtherController.prototype, "createLike", null);
__decorate([
    (0, common_1.Get)('likes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OtherController.prototype, "getLikes", null);
__decorate([
    (0, common_1.Get)('like/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OtherController.prototype, "getLike", null);
__decorate([
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], OtherController.prototype, "refreshToken", null);
OtherController = __decorate([
    (0, common_1.Controller)('other'),
    __metadata("design:paramtypes", [other_service_1.OtherService])
], OtherController);
exports.OtherController = OtherController;
//# sourceMappingURL=other.controller.js.map