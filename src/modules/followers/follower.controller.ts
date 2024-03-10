import { Controller } from "@nestjs/common";
import { FollowerService } from "./follower.service";

@Controller("followers")
export class FollowerController {
  constructor(private readonly service: FollowerService) {}
}
