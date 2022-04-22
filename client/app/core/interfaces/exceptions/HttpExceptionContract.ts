import { HttpStatus } from "@/app/core/enums/HttpStatus";

export interface HttpExceptionContract {
  statusCode: HttpStatus;
  message: string | string[];
}
