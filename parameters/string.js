import Parameter from './parameter.js'

class StringParam extends Parameter {

  constructor(minLength, maxLength, whitelist) {
    super()
    this.minLength = minLength || 0
    this.maxLength = maxLength || 0
    this.whitelist = whitelist || []
  }

  parse(param) {
    if (this.minLength > 0) {
      if (param.length < this.minLength)
        throw new Error(`Parameter length cannot shorter than ${this.minLength}.`)
    }
    if (this.maxLength > 0) {
      if (param.length > this.maxLength)
        throw new Error(`Parameter length cannot longer than ${this.maxLength}.`)
    }
    if (this.whitelist.length > 0) {
      if (!this.whitelist.includes(param))
        throw new Error(`Must use a whitelisted string.`)
    }
    return param
  }

  help() {
    let message = 'A string value.'
    if (this.minLength > 0)
      message += ` Must longer than ${this.minLength}.`
    if (this.maxLength > 0)
      message += ` Must shorter than ${this.maxLength}.`
    if (this.whitelist.length > 0)
      message += ` Must be the following string(s): ${this.whitelist.join(', ')}`
    return message
  }

}

export default StringParam
