import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { config } from 'dotenv'

config()

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    checkAccessToken(token: any, req: any): boolean {
        try {
            const token_ = token.split('Bearer ')[1]
            const result = this.jwtService.verify(token_, {
                secret: process.env.ACCESS_TOKEN
            })
            if (!result) return false
            req.userId = result.userId
            return true
        } catch {
            return false
        }
    }
}
