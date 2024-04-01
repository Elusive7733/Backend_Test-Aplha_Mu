import { Body, Controller, Get, HttpCode, Req } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(202)
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
