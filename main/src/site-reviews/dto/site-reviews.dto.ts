import { IsInt, IsNotEmpty, Max, Min } from 'class-validator'

export class CreateSiteReviewsDto {
    @IsInt()
    @Max(5)
    @Min(1)
    stars: number

    @IsNotEmpty()
    review: string
}