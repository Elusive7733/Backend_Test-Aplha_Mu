import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const GLOBAL_PREFIX: string = process.env.GLOBAL_PREFIX || 'v1'

  const app = await NestFactory.create(AppModule, {
    logger: console
  })

  app.setGlobalPrefix(GLOBAL_PREFIX)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(5000)
}
bootstrap()
