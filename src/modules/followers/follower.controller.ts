import { Body, Controller, Logger, Param, Post, Req, UseGuards } from "@nestjs/common";
import { FollowerService } from "./follower.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FollowDto } from "./dto/follow.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpCustomResponse } from "src/utils/http/responses/http-custom.response";

@ApiTags("followers")
@Controller("followers")
export class FollowerController {
  protected readonly logger = new Logger(FollowerController.name);

  constructor(private readonly service: FollowerService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("add")
  follow(@Req() req, @Body() followDto: FollowDto): Promise<HttpCustomResponse> {
    const currentUser = req.user;
    console.log("currentUser => ", currentUser);
    return this.service.addFollow(currentUser, followDto);
  }
}
