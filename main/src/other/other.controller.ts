import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'
import { LikesDto } from './dto/likes.dto'
import { UserDto } from './dto/user.dto'
import { ProductLikes } from './entities/likes.entity'
import { OtherService } from './other.service'

@Controller('other')
export class OtherController {
    constructor(
        private readonly otherService: OtherService
    ) {}

    @Post('create')
    async createUser(@Body() user: UserDto): Promise<string> {
        return await this.otherService.createUser(user)
    }

    @UseGuards(AuthGuard)
    @Post('like')
    async createLike(@Body() like: LikesDto, @Req() req: any): Promise<void> {
        return await this.otherService.createLike(like, req)
    }

    @Get('likes')
    async getLikes(): Promise<ProductLikes[]> {
        return await this.otherService.getLikes()
    }

    @Get('like/:id')
    async getLike(@Param('id', ParseIntPipe) id: number): Promise<ProductLikes> {
        return await this.otherService.getLike(id)
    }

    @Get('refresh')
    refreshToken(@Req() req: Request): string {
        return this.otherService.refreshToken(req)
    }
}
