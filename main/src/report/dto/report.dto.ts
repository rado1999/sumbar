import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator'

export class CreateReportDto {
    @IsNotEmpty()
    username: string

    @IsPhoneNumber('TM')
    phone: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    message: string
}