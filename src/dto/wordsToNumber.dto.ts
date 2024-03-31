import { IsNotEmpty, IsString } from 'class-validator'

export class WordsToNumberDto {
    @IsNotEmpty()
    @IsString()
    words: string
  }
  