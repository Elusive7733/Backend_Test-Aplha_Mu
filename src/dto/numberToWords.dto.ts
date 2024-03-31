import { IsNotEmpty, IsNumber } from 'class-validator'

export class NumberToWordsDto {
  @IsNotEmpty()
  @IsNumber()
  number: number
}
