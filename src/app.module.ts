import { Module } from '@nestjs/common'
import { AppController } from './app.controller'

//Service Imports
import { AppService } from './app.service'

//Module Imports
import { NumberToWordsModule } from './modules/numberToWords/numberToWords.module'
import { WordsToNumberModule } from './modules/wordsToNumber/wordsToNumber.module'

@Module({
  imports: [
    NumberToWordsModule,
    WordsToNumberModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
