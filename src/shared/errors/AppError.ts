class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly code: string;

  constructor(message: string, statusCode = 400, code = 'error.generic') {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export default AppError;
