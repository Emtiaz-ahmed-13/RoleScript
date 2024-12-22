class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack?: string) {
    super(message); // Call the parent `Error` constructor
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack; // Optional: Assign a custom stack trace if provided
    } else {
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
  }
}
export default AppError;
