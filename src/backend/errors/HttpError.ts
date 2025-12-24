import { ApiError } from './ApiError';

export class HttpError extends ApiError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}