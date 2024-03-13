import { Body, Controller, Logger, Param, Post, Req, UseGuards } from "@nestjs/common";
import { FollowerService } from "./follower.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FollowDto } from "./dto/follow.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FollowerEntity } from "./entities/follower.entity";

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
}
