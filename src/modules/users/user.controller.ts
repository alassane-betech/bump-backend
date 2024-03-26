import { Body, Controller, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";
import { PageOptionsDto } from "src/core/pagination/dto/page-options.dto";
import { IPage } from "src/core/pagination";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put("me")
  async updateMyProfileInfos(@CurrentUser() user: UserEntity, @Body() body: UpdateUserProfileDto): Promise<UserEntity> {
    return this.service.updateMyProfileInfos(user, body);
  }

  @Get("validate-email")
  async validateEmail(@Query("email") email: string): Promise<boolean> {
    return !(await this.service.isEmailExist(email));
  }

  @Get("validate-username")
  async validateUsername(@Query("username") username: string): Promise<boolean> {
    return !(await this.service.isUsernameExist(username));
  }

  @Get("followers/:id")
  findAllFollowersByUserId(
    @Param("id") id: string,
    @Query("pageOptions") pageOptions: PageOptionsDto
  ): Promise<IPage<UserEntity>> {
    return this.service.findAllFollowersByUserId(id, pageOptions);
  }

  @Get("followings/:id")
  findAllFollowingsByUserId(
    @Param("id") id: string,
    @Query("pageOptions") pageOptions: PageOptionsDto
  ): Promise<IPage<UserEntity>> {
    return this.service.findAllFollowingsByUserId(id, pageOptions);
  }
}
