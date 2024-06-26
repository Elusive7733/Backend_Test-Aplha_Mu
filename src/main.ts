import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: console
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(5000)
}
bootstrap()
