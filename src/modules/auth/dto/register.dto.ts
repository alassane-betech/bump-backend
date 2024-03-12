import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsString } from "class-validator";
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
  @IsDateString(
    { strict: true },
    {
      message: ({ property }) => {
        return `${property} must be a valid date (Required format: YYYY-MM-DD)`;
      }
    }
  )
  birthdate: string;

  @ApiProperty()
  @IsEnum(UserCategoryEnum)
  category: UserCategoryEnum;
}
