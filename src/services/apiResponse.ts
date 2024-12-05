class ApiResponse {
  success: boolean;
  message: string;
  data: any;
  error: any;

  constructor(success: boolean, message: string, data?: any, error?: any) {
    (this.success = success),
      (this.message = message),
      (this.data = data),
      (this.error = error);
  }
}

export default ApiResponse;
