/*
just a custom error class that will allow me to extend error handling without
heavy refactoring in future
 */

class CustomError extends Error {
  constructor (err) {
    super()
    this.originalMessage = err.message
  }
}

export default CustomError
