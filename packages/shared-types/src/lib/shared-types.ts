export function sharedTypes(): string {
  return 'shared-types';
}

export enum HttpStatus {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

interface ErrorResponse {
  status: HttpStatus;
  error: string;
}

interface InternalServerErrorResponse extends ErrorResponse {
  status: HttpStatus.InternalServerError;
  error: 'Internal Server Error';
}

interface BadRequestErrorResponse extends ErrorResponse {
  status: HttpStatus.BadRequest;
  error: 'Bad Request';
}

interface UnauthorizedErrorResponse extends ErrorResponse {
  status: HttpStatus.Unauthorized;
  error: 'Unauthorized';
}

export type ErrorResponseType =
  | InternalServerErrorResponse
  | BadRequestErrorResponse
  | UnauthorizedErrorResponse

