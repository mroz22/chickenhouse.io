import CustomError from './CustomError'

class FirebaseError extends CustomError {
  constructor (err) {
    super(err)
    this.message = FirebaseError.setMessage(err.message)
  }
  static setMessage (message) {
    switch (message) {
      case 'PERMISSION_DENIED: Permission denied':
        return 'Permission denied'
      default: return message
    }
  }
}

export default FirebaseError
