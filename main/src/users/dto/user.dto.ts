import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsPositive, Length } from 'class-validator'

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

export class Login {
    @IsInt()
    @IsPositive()
    id: number
}

export class Edit {
    @IsNotEmpty()
    @Length(2)
    name: string

    @IsEmail()
    @IsOptional()
    email: string
}
