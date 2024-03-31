import { Module } from '@nestjs/common'
import { WordsToNumberController } from './wordsToNumber.controller'
import { WordsToNumberService } from './wordsToNumber.service'

@Module({
  imports: [],
  controllers: [WordsToNumberController],
  providers: [WordsToNumberService]
})
export class WordsToNumberModule {}
