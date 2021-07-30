import { prevMonth, prevXMonth } from '../utils/date'

// Fix this later, let's move to jest

describe('date.js', () => {
  describe('prevMonth', () => {
    test('regular month', () => {
      expect(prevMonth('2020-02')).toBe('2020-01')
    })
    test('regular month without padding', () => {
      expect(prevMonth('2020-12')).toBe('2020-11')
    })
    test('year edge month', () => {
      expect(prevMonth('2020-01')).toBe('2019-12')
    })
  })
  describe('prevXMonth', () => {
    test('1 month', () => {
      expect(prevXMonth('2020-02', 1)).toBe('2020-01')
    })
    test('3 month', () => {
      expect(prevXMonth('2020-02', 3)).toBe('2019-11')
    })
    test('12 months', () => {
      expect(prevXMonth('2020-02', 12)).toBe('2019-02')
    })

  })
})
test('date.js', () => {
  expect(true).toBe(true)
})