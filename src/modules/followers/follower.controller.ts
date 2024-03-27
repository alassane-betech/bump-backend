import { Body, Controller, Delete, Logger, Param, Post, Req, UseGuards } from "@nestjs/common";
import { FollowerService } from "./follower.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FollowDto } from "./dto/follow.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FollowerEntity } from "./entities/follower.entity";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { UserEntity } from "../users/entities/user.entity";

@ApiTags("followers")
@Controller("followers")
export class FollowerController {
  protected readonly logger = new Logger(FollowerController.name);

  constructor(private readonly service: FollowerService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("add")
  follow(@CurrentUser() currentUser: UserEntity, @Body() followDto: FollowDto): Promise<FollowerEntity> {
    return this.service.addFollow(currentUser, followDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete("delete")
  unfollow(@CurrentUser() currentUser: UserEntity, @Body() followDto: FollowDto): Promise<FollowerEntity> {
    return this.service.unfollow(currentUser, followDto);
  }
}
