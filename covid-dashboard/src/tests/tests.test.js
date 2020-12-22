const modifyNumberValue = require('../js/common-functions/modifyNumberValue')

describe('modifyNumberValue function:', () => {

    test('should be defined', () => {
        expect(modifyNumberValue).toBeDefined()
        expect(modifyNumberValue).not.toBeUndefined()
    })

    test('should return string', () => {
        expect(typeof modifyNumberValue()).toBe('string')
        expect(typeof modifyNumberValue(0)).toBe('string')
        expect(typeof modifyNumberValue('1303')).toBe('string')
        expect(typeof modifyNumberValue(500)).toBe('string')
        expect(typeof modifyNumberValue(10000000)).toBe('string')
    })

    test('should have a divisor if digit count greater than 3', () => {
        expect(modifyNumberValue(0)).not.toContain(' ')
        expect(modifyNumberValue(130)).not.toContain(' ')
        expect(modifyNumberValue(1303)).toContain(' ')
        expect(modifyNumberValue(199119)).toContain(' ')
        expect(modifyNumberValue(155115515)).toContain(' ')
    })

    test('should return value, which equal argument number', () => {
        expect(
            Number((modifyNumberValue(1)).split(' ').join(''))
        ).toBe(1)

        expect(
            Number((modifyNumberValue(130)).split(' ').join(''))
        ).toBe(130)

        expect(
            Number((modifyNumberValue(1303)).split(' ').join(''))
        ).toBe(1303)

        expect(
            Number((modifyNumberValue(199119)).split(' ').join(''))
        ).toBe(199119)

        expect(
            Number((modifyNumberValue(1551515515)).split(' ').join(''))
        ).toBe(1551515515)
    })

    test('should return correct value', () => {
        expect(modifyNumberValue()).toBe('0')
        expect(modifyNumberValue(1)).toBe('1')
        expect(modifyNumberValue(500)).toBe('500')
        expect(modifyNumberValue(5000)).toBe('5 000')
        expect(modifyNumberValue(5000000)).toBe('5 000 000')
    })
})

