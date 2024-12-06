import { ErrorCodes, HttpException } from "./root";

export class BadRequestException extends HttpException {
  constructor(message: string, errorCodes: ErrorCodes, error?: any) {
    super(message, errorCodes, 400, error || null);
  }
}
