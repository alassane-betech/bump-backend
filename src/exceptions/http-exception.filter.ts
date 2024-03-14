import { Catch, ArgumentsHost, HttpException, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { CustomHttpException } from "./models/custom-http-exception";
import { TargetEnum } from "./enums/target.enum";
import { IErrorResponse } from "./interfaces/error-response.interface";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception["response"]["message"] || "Internal server error";
    const target = exception instanceof CustomHttpException ? exception.target : null;

    const errorResponse: IErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      path: request.url,
      target: target || TargetEnum.DEV
    };

    response.status(status).json(errorResponse);
  }
}
