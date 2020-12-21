function modifyNumberValue(number) {
    if (!number) return '0';

    const digits = Math.round(number).toString().split('').reverse();
    const digitsSet = [];

    while (digits.length !== 0) {
        digitsSet.push(digits.splice(0, 3).reverse().join(''))
    }

    return digitsSet.reverse().join(' ');
}

module.exports = modifyNumberValue
