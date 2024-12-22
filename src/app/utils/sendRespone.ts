import { Response } from 'express';

type TResponse<T> = {
  statusCode: number; // HTTP status code
  status: boolean; // Indicates the success of the operation
  message?: string; // Optional message
  data?: T; // Optional data payload
  token?: string; // Optional token (e.g., for authentication)
};

const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
  const { statusCode, status, message, data, token } = responseData;

  res.status(statusCode).json({
    success: status,
    message: message || 'Operation completed',
    data: data || null,
    token: token || undefined, // Only include token if it's provided
  });
};

export default sendResponse;
