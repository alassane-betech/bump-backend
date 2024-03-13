import { TargetEnum } from "../enums/target.enum";

export interface IErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  path: string;
  target: TargetEnum;
}
