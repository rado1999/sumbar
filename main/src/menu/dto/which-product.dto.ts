import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator'

export class WhichProductDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    category: number

    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    @IsInt()
    subCategory: number
}