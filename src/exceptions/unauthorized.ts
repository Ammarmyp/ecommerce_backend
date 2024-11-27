import { ErrorCodes, HttpException } from "./root";

export class UnAuthorizedAccessException extends HttpException {
  constructor(message: string, errorCodes: ErrorCodes) {
    super(message, errorCodes, 401, null);
  }
}
