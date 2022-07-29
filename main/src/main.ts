import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.useStaticAssets(join(__dirname, '..', 'public'))
    app.enableCors()
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    await app.listen(3002, '192.168.31.202')
}

bootstrap()
