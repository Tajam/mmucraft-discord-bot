import Parameter from './parameter.js'

class NumberParam extends Parameter {

  constructor(minValue, maxValue, maxLength) {
    super()
    this.minValue = minValue || 0
    this.maxValue = maxValue || 0
    this.maxLength = maxLength || 0
  }

  parse(param) {
    if (this.maxLength > 0) {
      if (param.length > this.maxLength)
        throw new Error(`The expression length cannot exceed ${this.maxLength}.`)
    }
    const value = parseInt(param, 10)
    if (isNaN(value))
      throw new Error('Unable to parse expression into number.')
    if (this.minValue > 0) {
      if (value < this.minValue)
        throw new Error(`Value cannot smaller than ${this.minValue}`)
    }
    if (this.maxValue > 0) {
      if (value > this.maxValue)
        throw new Error(`Value cannot larger than ${this.maxValue}`)
    }
    return value
  }

  help() {
    let message = 'An integer number.'
    if (this.minValue > 0)
      message += ` Must larger than ${this.minValue}.`
    if (this.maxValue > 0)
      message += ` Must smaller than ${this.maxValue}.`
    if (this.maxLength > 0)
      message += ` Expression cannot longer than ${this.maxLength} letter(s).`
    return message
  }

}

export default NumberParam
