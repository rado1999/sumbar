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
exports.OtherService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const likes_entity_1 = require("./entities/likes.entity");
const user_entity_1 = require("./entities/user.entity");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let OtherService = class OtherService {
    constructor(userRepo, likesRepo, jwtService) {
        this.userRepo = userRepo;
        this.likesRepo = likesRepo;
        this.jwtService = jwtService;
    }
    async createUser(user) {
        const currentUser = await this.userRepo.findOne({
            where: { email: user.email }
        });
        if (!currentUser) {
            const newUser = this.userRepo.create(user);
            await this.userRepo.save(newUser);
            return this.createTokens(newUser.id);
        }
        return this.createTokens(currentUser.id);
    }
    async createLike(like, req) {
        const result = await this.likesRepo.query(`SELECT * FROM likes WHERE "userId" = $1`, [req.userId]);
        if (result.length)
            throw new common_1.BadRequestException('already has been liked');
        const like_ = this.likesRepo.create({
            user: req.userId,
            product: like.product
        });
        await this.likesRepo.save(like_);
        return;
    }
    async getLikes() {
        return await this.likesRepo.find({
            relations: ['user', 'product']
        });
    }
    async getLike(id) {
        const result = await this.likesRepo.findOne({
            where: { product: { id: id } },
            relations: ['user', 'product']
        });
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
    refreshToken(req) {
        try {
            const token = req.headers.authorization.split('Bearer ')[1];
            const result = this.jwtService.verify(token, {
                secret: process.env.REFRESH_TOKEN,
            });
            return this.createToken(process.env.RANDOM_INFO, process.env.ACCESS_TOKEN, process.env.ACCESS_TIME, result.userId);
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
    }
    createTokens(id) {
        const accessToken = this.createToken(process.env.RANDOM_INFO, process.env.ACCESS_TOKEN, process.env.ACCESS_TIME, id);
        const refreshToken = this.createToken(process.env.RANDOM_INFO, process.env.REFRESH_TOKEN, process.env.REFRESH_TIME, id);
        return { accessToken, refreshToken };
    }
    createToken(randomInfo, secretKey, time, id) {
        return this.jwtService.sign({
            userId: id,
            someRandomInfo: randomInfo
        }, {
            secret: secretKey,
            expiresIn: time,
        });
    }
};
OtherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(likes_entity_1.Likes)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], OtherService);
exports.OtherService = OtherService;
//# sourceMappingURL=other.service.js.map