import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from 'src/product/entities/product.entity'
import { MainPageController } from './main-page.controller'
import { MainPageService } from './main-page.service'

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [MainPageController],
    providers: [MainPageService]
})
export class MainPageModule { }
