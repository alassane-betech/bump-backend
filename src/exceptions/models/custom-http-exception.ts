import { HttpException, HttpStatus } from "@nestjs/common";
import { TargetEnum } from "../enums/target.enum";

export class CustomHttpException extends HttpException {
  target: TargetEnum;

  constructor(message: string, statusCode: HttpStatus, target: TargetEnum = TargetEnum.DEV) {
    super(message, statusCode);
    this.target = target;
  }
}
