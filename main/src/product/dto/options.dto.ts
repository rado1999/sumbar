import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'

enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

enum By {
    PRICE = 'price',
    ID = 'id'
}

export class Options {
    @IsEnum(Order)
    @IsOptional()
    order: Order = Order.DESC

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    page: number = 1

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    take: number = 40

    @IsEnum(By)
    @IsOptional()
    by: By = By.ID

    get skip(): number {
        return (this.page - 1) * this.take
    }
}
