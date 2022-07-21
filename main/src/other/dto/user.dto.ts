import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator'

export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsPhoneNumber('TM')
    phone: string

    @IsNotEmpty()
    @Length(2)
    name: string
}