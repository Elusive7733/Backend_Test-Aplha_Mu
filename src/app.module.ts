import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

//Service Imports

//Module Imports
import { NumberToWordsModule } from './modules/numberToWords/numberToWords.module'

@Module({
  imports: [
    NumberToWordsModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
