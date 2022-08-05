import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './admin.entity'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { Roles } from './roles.entity'

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Admin, Roles])],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard]
})
export class AuthModule { }
