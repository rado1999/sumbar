import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: false
    })
    app.useStaticAssets(join(__dirname, '..', 'public'))
    app.enableCors()
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    await app.listen(3002, '95.85.127.250')
}

bootstrap()
