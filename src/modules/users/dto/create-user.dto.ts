import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserCategoryEnum } from "../enums/user-category.enum";

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  birthdate: string;

  @IsEnum(UserCategoryEnum)
  category: UserCategoryEnum;
}
