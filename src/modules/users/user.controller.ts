import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
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
