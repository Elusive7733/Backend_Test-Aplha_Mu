import { Body, Controller, Post, HttpCode } from '@nestjs/common'
import { WordsToNumberService } from './wordsToNumber.service'
import { WordsToNumberDto } from 'src/dto/wordsToNumber.dto'

@Controller('/to/number')
export class WordsToNumberController {
  constructor(private readonly wordsToNumberService: WordsToNumberService) {}

  @Post()
  @HttpCode(200)
  convertToNumber(@Body() wordsToNumberDto: WordsToNumberDto) {
    return this.wordsToNumberService.convertWordsToNumber(wordsToNumberDto)
  }
}
