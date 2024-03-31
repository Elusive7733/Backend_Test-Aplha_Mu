import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { NumberToWordsDto } from 'src/dto/numberToWords.dto'

@Injectable()
export class NumberToWordsService {
  private numberToWords(number: number): string {
    const thousands = ['', 'thousand', 'million']

    if (number === 0) return 'zero'

    let words = ''

    for (let i = 0; number > 0 && i < thousands.length; i++) {
      if (number % 1000 !== 0) {
        let temp = this.hundredHelper(number % 1000)
        words = temp + (temp ? ' ' + thousands[i] + ' ' : '') + words
      }
      number = Math.floor(number / 1000)
    }

    return words.trim()
  }

  private hundredHelper(number: number) {
    const units = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine'
    ]
    const teens = [
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen'
    ]
    const tens = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety'
    ]

    let result = ''

    if (number > 99) {
      result += units[Math.floor(number / 100)] + ' hundred '
      number %= 100
    }
    if (number > 19) {
      result += tens[Math.floor(number / 10)]
      number %= 10
      if (number) result += '-' + units[number]
    } else if (number > 0) {
      result += (result ? ' ' : '') + (number < 10 ? units[number] : teens[number - 10])
    }

    return result.trim()
  }

  async convertNumberToWords(data: NumberToWordsDto) {
    try {
      let number = data.number
      let result = ''

      if (number > 9999999) {
        throw new Error('Number out of supported range')
      }

      const isNegative = number < 0
      number = Math.abs(number)

      const integerPart = Math.floor(number)
      const fractionalPart = number - integerPart

    
      result += this.numberToWords(integerPart)

      if (fractionalPart > 0) {
        if (fractionalPart === 0.25) {
          result += ' and a quarter'
        } else if (fractionalPart === 0.5) {
          result += ' and a half'
        } else {
          throw new Error('Unsupported fractional part')
        }
      }

      if (isNegative) {
        result = 'minus ' + result
      }

      return {
        words: result.trim()
      }
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: error.message
      })
    }
  }
}
