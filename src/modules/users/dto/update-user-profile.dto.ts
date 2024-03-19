import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";
import { RegisterDto } from "src/modules/auth/dto/register.dto";

export class UpdateUserProfileDto extends OmitType(PartialType(RegisterDto), ["email", "password"]) {
  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsString()
  @IsOptional()
  description: string;
}
