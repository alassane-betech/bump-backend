import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserCategoryEnum } from "src/modules/users/enums/user-category.enum";

export class RegisterDto {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  birthdate: string;

  @ApiProperty()
  @IsEnum(UserCategoryEnum)
  category: UserCategoryEnum;
}
