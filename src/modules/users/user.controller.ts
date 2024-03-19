import { Body, Controller, Get, Put, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put("me")
  async updateMyProfileInfos(@CurrentUser() user: UserEntity, @Body() body: UpdateUserProfileDto): Promise<UserEntity> {
    return this.userService.updateMyProfileInfos(user, body);
  }

  @Get("validate-email")
  async validateEmail(@Query("email") email: string): Promise<boolean> {
    return !(await this.userService.isEmailExist(email));
  }

  @Get("validate-username")
  async validateUsername(@Query("username") username: string): Promise<boolean> {
    return !(await this.userService.isUsernameExist(username));
  }
}
