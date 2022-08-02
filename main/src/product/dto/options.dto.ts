import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'

enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

enum By {
    ID = 'id',
    PRICE = 'price'
}

enum Popular {
    TRUE = 'true',
    FALSE = 'false'
}

enum Discounts {
    TRUE = 'true',
    FALSE = 'false'
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

    @IsEnum(Popular)
    @IsOptional()
    popular: Popular = Popular.FALSE

    @IsEnum(Discounts)
    @IsOptional()
    discounts: Discounts = Discounts.FALSE

    get skip(): number {
        return (this.page - 1) * this.take
    }
}
