import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from 'src/product/entities/product.entity'
import { Category } from './entities/category.entity'
import { SubCategory } from './entities/subCategory.entity'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

@Module({
    imports: [TypeOrmModule.forFeature([Category, SubCategory, Product])],
    controllers: [MenuController],
    providers: [MenuService]
})
export class MenuModule { }
