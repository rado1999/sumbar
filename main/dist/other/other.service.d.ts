import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LikesDto } from './dto/likes.dto';
import { UserDto } from './dto/user.dto';
import { Likes } from './entities/likes.entity';
import { User } from './entities/user.entity';
import { Request } from 'express';
export declare class OtherService {
    private readonly userRepo;
    private readonly likesRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, likesRepo: Repository<Likes>, jwtService: JwtService);
    createUser(user: UserDto): Promise<string>;
    createLike(like: LikesDto, req: any): Promise<void>;
    getLikes(): Promise<Likes[]>;
    getLike(id: number): Promise<Likes>;
    refreshToken(req: Request): string;
    private createTokens;
    private createToken;
}
