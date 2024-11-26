import { ErrorCodes, HttpException } from "./root";

export class BadRequestException extends HttpException {
  constructor(message: string, errorCodes: ErrorCodes) {
    super(message, errorCodes, 400, null);
  }
}
