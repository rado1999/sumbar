import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { Likes } from './entities/likes.entity'
import { Password } from './entities/password.entity'
import { User } from './entities/user.entity'
import { OtherController } from './other.controller'
import { OtherService } from './other.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Likes, Password]),
        JwtModule.register({}),
        AuthModule
    ],
    controllers: [OtherController],
    providers: [OtherService]
})
export class OtherModule {}
