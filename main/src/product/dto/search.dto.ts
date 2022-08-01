import { IsNotEmpty } from 'class-validator'

export class Search {
    @IsNotEmpty()
    word: string
}