import {
    ArrayMaxSize, IsInt, IsNotEmpty, IsOptional, IsPositive
} from 'class-validator'


export class ProductCreateDto {
    @ArrayMaxSize(6)
    @IsNotEmpty({ each: true })
    imageUrl: string[]

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    company: string

    @IsNotEmpty()
    companyImage: string

    @IsNotEmpty()
    model: string

    @IsNotEmpty()
    mainDescription: string

    @IsNotEmpty()
    @IsPositive()
    price: number

    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    category: any

    @IsOptional()
    @IsPositive()
    @IsInt()
    subCategory: any
}
