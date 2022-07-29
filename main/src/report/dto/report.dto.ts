import { IsNotEmpty } from 'class-validator'

export class CreateReportDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    emailOrPhone: string

    @IsNotEmpty()
    message: string
}