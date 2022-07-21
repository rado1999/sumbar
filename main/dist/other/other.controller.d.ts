import { Request } from 'express';
import { LikesDto } from './dto/likes.dto';
import { UserDto } from './dto/user.dto';
import { Likes } from './entities/likes.entity';
import { OtherService } from './other.service';
export declare class OtherController {
    private readonly otherService;
    constructor(otherService: OtherService);
    createUser(user: UserDto): Promise<string>;
    createLike(like: LikesDto, req: any): Promise<void>;
    getLikes(): Promise<Likes[]>;
    getLike(id: number): Promise<Likes>;
    refreshToken(req: Request): string;
}
