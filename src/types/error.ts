export interface ErrorResponse {
  data: {
    errors: {
      [key: string]: string[];
    };
    message: string;
    success: boolean;
  };
  status: number;
}