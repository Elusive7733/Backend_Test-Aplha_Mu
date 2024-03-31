//@ts-nocheck
import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common'
import { WordsToNumberDto } from 'src/dto/wordsToNumber.dto'

@Injectable()
export class WordsToNumberService {
  private readonly basicNumbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90
  }

  private readonly multiplierNumbers = {
    hundred: 100,
    thousand: 1000,
    million: 1000000
  }

  private readonly fractionNumbers = {
    half: 0.5,
    quarter: 0.25
  }

  async convertWordsToNumber({ words }: WordsToNumberDto): Promise<{ number: number }> {
    try {
      const normalizedWords = words
        .toLowerCase()
        .replace(/-/g, ' ')
        .replace(/ and /g, ' ')
        .replace(/,/g, '')
        .split(' ')
      let total = 0
      let currentNumber = 0
      let decimalPart = 0
      let isDecimal = false

      for (let i = 0; i < normalizedWords.length; i++) {
        const word = normalizedWords[i]
        if (this.basicNumbers[word] !== undefined) {
          if (!isDecimal) {
            currentNumber += this.basicNumbers[word]
          } else {
            decimalPart = decimalPart * 10 + this.basicNumbers[word]
          }
        } else if (this.multiplierNumbers[word] !== undefined) {
          currentNumber =
            (currentNumber === 0 ? 1 : currentNumber) * this.multiplierNumbers[word]
          total += currentNumber
          currentNumber = 0
        } else if (word === 'point') {
          isDecimal = true
        } else if (this.fractionNumbers[word] !== undefined && !isDecimal) {
          total += currentNumber + this.fractionNumbers[word]
          currentNumber = 0
        } else {
          throw new UnprocessableEntityException({
            error: 'Invalid input',
            status: HttpStatus.UNPROCESSABLE_ENTITY
          })
        }
      }

      if (isDecimal) {
        let decimalPlace = Math.pow(10, decimalPart.toString().length)
        total += currentNumber + decimalPart / decimalPlace
      } else {
        total += currentNumber
      }

      return { number: total }
    } catch (e) {
      throw new UnprocessableEntityException({
        error: 'Invalid input',
        status: HttpStatus.UNPROCESSABLE_ENTITY
      })
    }
  }
}
