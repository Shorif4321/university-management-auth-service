class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message); // message error er property
    this.statusCode = statusCode;
    // jodi constractorer input a stack thake
    if (stack) {
      this.stack = stack;
    } else {
      // stack na thakle
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
