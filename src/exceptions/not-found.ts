import { ErrorCodes, HttpException } from "./root";

export class NotFoundException extends HttpException {
  constructor(message: string, errorCodes: ErrorCodes) {
    super(message, errorCodes, 404, null);
  }
}
