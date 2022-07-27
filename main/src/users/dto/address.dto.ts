import { IsNotEmpty, Length } from 'class-validator'

export class AddressDto {
    @IsNotEmpty()
    @Length(2)
    address: string
}