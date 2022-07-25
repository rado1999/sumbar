import { Controller, Get, Query } from '@nestjs/common'
import { Product } from 'src/product/entities/product.entity'
import { WhichProductDto } from './dto/which-product.dto'
import { Category } from './entities/category.entity'
import { MenuService } from './menu.service'

@Controller('menu')
export class MenuController {
    constructor(
        private readonly menuService: MenuService
    ) {}

    @Get()
    async getCategory(): Promise<Category[]> {
        return await this.menuService.getCategory()
    }

    @Get('by')
    async getByCategory(@Query() which: WhichProductDto): Promise<Product[]> {
        return await this.menuService.getByCategory(which)
    }
}
