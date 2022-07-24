import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { ProductModule } from './product/product.module'
import { OtherModule } from './other/other.module'
import { AuthModule } from './auth/auth.module'
import { MenuModule } from './menu/menu.module'
import { SiteReviewsModule } from './site-reviews/site-reviews.module'
import { ReportModule } from './report/report.module';

config()

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                autoLoadEntities: true,
                synchronize: Boolean(process.env.SYNCHRONIZE),
                logging: Boolean(process.env.LOGGING)
            })
        }),
        ProductModule,
        OtherModule,
        AuthModule,
        MenuModule,
        SiteReviewsModule,
        ReportModule
    ]
})
export class AppModule { }
