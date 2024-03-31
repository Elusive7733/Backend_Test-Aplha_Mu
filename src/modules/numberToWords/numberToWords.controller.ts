import { Body, Controller, Post, HttpCode } from '@nestjs/common'
import { NumberToWordsService } from './numberToWords.service'
import { NumberToWordsDto } from 'src/dto/numberToWords.dto'

@Controller('/to/words')
export class NumberToWordsController {
  constructor(private readonly numberToWordsService: NumberToWordsService) {}

  @Post()
  @HttpCode(200)
  convertToWords(@Body() numberToWordsDto: NumberToWordsDto) {
    return this.numberToWordsService.convertNumberToWords(numberToWordsDto)
  }
}
