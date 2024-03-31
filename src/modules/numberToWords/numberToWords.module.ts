import { Module } from '@nestjs/common'
import { NumberToWordsController } from './numberToWords.controller'
import { NumberToWordsService } from './numberToWords.service'

@Module({
  imports: [],
  controllers: [NumberToWordsController],
  providers: [NumberToWordsService]
})
export class NumberToWordsModule {}
