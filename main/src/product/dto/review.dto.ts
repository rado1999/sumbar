import { IsInt, IsNotEmpty, IsPositive, Max, Min } from 'class-validator'

export class ReviewDto {
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    @Max(5)
    @Min(1)
    @IsInt()
    stars: number

    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    product: any
}