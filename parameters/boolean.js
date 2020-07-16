import Parameter from './parameter.js'

class BoolParam extends Parameter {

  constructor() {
    super()
  }

  parse(param) {
    const stringTrue = ['true', '1', 'yes']
    const stringFalse = ['false', '0', 'no']
    const lowerParam = param.toLowerCase()
    if (stringTrue.includes(lowerParam)) {
      return true
    } else if (stringFalse.includes(lowerParam)) {
      return false
    } else {
      throw new Error('The statement cannot be determined as true or false.')
    }
  }

  help() {
    return 'A boolean value. True or false. 1 or 0. Yes or no.'
  }

}

export default BoolParam
