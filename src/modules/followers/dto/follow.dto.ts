import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FollowDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
