class Parameter {

  constructor() {
    if (this.constructor == Parameter) {
      throw new Error('Abstract classes cannot be instantiated.');
    }
  }

  // This method will parse the string into different data type
  parse(param) {
    throw new Error('This method must be implemented.');
  }

  // Get the help message of this parameter regarding the data type
  help() {
    throw new Error('This method must be implemented.');
  }

  setName(name) {
    this.name = name
    return this
  }

  getName() {
    return this.name || 'parameter'
  }

  setDesc(desc) {
    this.desc = desc
    return this
  }

  getDesc() {
    return this.desc || 'No description for this parameter'
  }

  required() {
    this.required = true
    return this
  }

  optional() {
    this.required = false
    return this
  }

}

export default Parameter