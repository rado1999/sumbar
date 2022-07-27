import { IsInt, IsPositive } from 'class-validator'

export class LikesDto {
    @IsInt()
    @IsPositive()
    product: any
}