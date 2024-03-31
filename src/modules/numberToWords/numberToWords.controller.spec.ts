import { Test } from '@nestjs/testing'
import { HttpException, HttpStatus } from '@nestjs/common'
import { NumberToWordsService } from './numberToWords.service'

describe('NumberToWordsService', () => {
  let numberToWordsService: NumberToWordsService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [NumberToWordsService]
    }).compile()

    numberToWordsService = moduleRef.get<NumberToWordsService>(NumberToWordsService)
  })

  it('should correctly convert a simple number', async () => {
    expect(await numberToWordsService.convertNumberToWords({ number: 123 })).toEqual({
      words: 'one hundred twenty-three'
    })
  })

  it('should correctly convert a number with a fractional part', async () => {
    expect(await numberToWordsService.convertNumberToWords({ number: 101.25 })).toEqual({
      words: 'one hundred  one and a quarter'
    })
  })

  it('should correctly convert a large number', async () => {
    expect(await numberToWordsService.convertNumberToWords({ number: 1234567 })).toEqual({
      words: 'one million two hundred thirty-four thousand five hundred sixty-seven'
    })
  })

  it('should throw an exception for unsupported fractional parts', async () => {
    expect.assertions(2)

    try {
      await numberToWordsService.convertNumberToWords({ number: 99.99 })
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.response).toEqual({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Unsupported fractional part'
      })
    }
  })

  it('should handle .5 as "a half"', async () => {
    expect(await numberToWordsService.convertNumberToWords({ number: 456.5 })).toEqual({
      words: 'four hundred fifty-six and a half'
    })
  })

  it('should correctly convert a number in millions', async () => {
    expect(await numberToWordsService.convertNumberToWords({ number: 9999999 })).toEqual({
      words: 'nine million nine hundred ninety-nine thousand nine hundred ninety-nine'
    })
  })

  it('should correctly convert a number with millions and a fractional part', async () => {
    expect(await numberToWordsService.convertNumberToWords({ number: 1234567.25 })).toEqual({
      words:
        'one million two hundred thirty-four thousand five hundred sixty-seven and a quarter'
    })
  })

  it('should correctly convert a negative number', async () => {
    expect(await numberToWordsService.convertNumberToWords({ number: -123 })).toEqual({
      words: 'minus one hundred twenty-three'
    })
  })

  it('should correctly convert a negative number with a fractional part', async () => {
    expect(await numberToWordsService.convertNumberToWords({ number: -456.5 })).toEqual({
      words: 'minus four hundred fifty-six and a half'
    })
  })

  it('should throw an exception for numbers out of the supported range', async () => {
    expect.assertions(2)

    try {
      await numberToWordsService.convertNumberToWords({ number: 10000000 })
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.response).toEqual({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Number out of supported range'
      })
    }
  })
})
