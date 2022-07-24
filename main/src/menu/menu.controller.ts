import { Controller, Get } from '@nestjs/common'
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
}
