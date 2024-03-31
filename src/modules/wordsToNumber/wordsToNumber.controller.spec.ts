import { Test } from '@nestjs/testing'
import { HttpException, HttpStatus } from '@nestjs/common'
import { WordsToNumberService } from './wordsToNumber.service'

describe('WordsToNumberService', () => {
  let wordsToNumberService: WordsToNumberService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [WordsToNumberService]
    }).compile()

    wordsToNumberService = moduleRef.get<WordsToNumberService>(WordsToNumberService)
  })

  it('should correctly convert simple numbers', async () => {
    expect(await wordsToNumberService.convertWordsToNumber({ words: 'Twenty four' })).toEqual({
      number: 24
    })
  })

  it('should handle numbers with conjunctions', async () => {
    expect(
      await wordsToNumberService.convertWordsToNumber({ words: 'One hundred and fifty-four' })
    ).toEqual({ number: 154 })
  })

  it('should handle numbers without conjunctions', async () => {
    expect(
      await wordsToNumberService.convertWordsToNumber({ words: 'One hundred fifty four' })
    ).toEqual({ number: 154 })
  })

  it('should correctly convert large numbers', async () => {
    expect(
      await wordsToNumberService.convertWordsToNumber({
        words: 'Nine million nine hundred ninety-nine thousand nine hundred ninety-nine'
      })
    ).toEqual({ number: 9999999 })
  })

  it('should handle numbers with commonly used fractions - half', async () => {
    expect(
      await wordsToNumberService.convertWordsToNumber({ words: 'Two and a half' })
    ).toEqual({ number: 2.5 })
  })

  it('should handle numbers with commonly used fractions - quarter', async () => {
    expect(
      await wordsToNumberService.convertWordsToNumber({ words: 'One and a quarter' })
    ).toEqual({ number: 1.25 })
  })

  it('should ignore irrelevant punctuation', async () => {
    expect(
      await wordsToNumberService.convertWordsToNumber({
        words: 'One thousand, two hundred thirty-four'
      })
    ).toEqual({ number: 1234 })
  })

  it('should convert words to numbers with mixed fractions and whole numbers', async () => {
    expect(
      await wordsToNumberService.convertWordsToNumber({
        words: 'Seven thousand and two point five'
      })
    ).toEqual({ number: 7002.5 })
  })

  it('should handle edge cases with zero', async () => {
    expect(await wordsToNumberService.convertWordsToNumber({ words: 'Zero' })).toEqual({
      number: 0
    })
  })

  it('should throw an exception for invalid input', async () => {
    expect.assertions(2)

    try {
      await wordsToNumberService.convertWordsToNumber({ words: 'Eleventy billion' })
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.response).toEqual({
        ...error.response,
        status: HttpStatus.UNPROCESSABLE_ENTITY
      })
    }
  })
})
