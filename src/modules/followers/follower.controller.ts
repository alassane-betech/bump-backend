import { Body, Controller, Get, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserEntity } from "../users/entities/user.entity";
import { FollowDto } from "./dto/follow.dto";
import { FollowerEntity } from "./entities/follower.entity";
import { FollowerService } from "./follower.service";

@ApiTags("followers")
@Controller("followers")
export class FollowerController {
  protected readonly logger = new Logger(FollowerController.name);

  constructor(private readonly service: FollowerService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("add")
  follow(@Req() req, @Body() followDto: FollowDto): Promise<FollowerEntity> {
    const currentUser = req.user;
    return this.service.addFollow(currentUser, followDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("delete")
  unfollow(@Req() req, @Body() followDto: FollowDto): Promise<FollowerEntity> {
    const currentUser = req.user;
    return this.service.unfollow(currentUser, followDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [UserEntity], isArray: true })
  @Get("me")
  getUserFollowers(@CurrentUser() currentUser: UserEntity): Promise<UserEntity[]> {
    return this.service.getUserFollowers(currentUser);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get("following/me")
  getUserFollowing(@CurrentUser() currentUser: UserEntity): Promise<UserEntity[]> {
    return this.service.getUserFollowing(currentUser);
  }
}
