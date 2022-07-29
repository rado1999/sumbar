import { IsNotEmpty } from 'class-validator'

export class CreateReportDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email_or_phone: string

    @IsNotEmpty()
    message: string
}