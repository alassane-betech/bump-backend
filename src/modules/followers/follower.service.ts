import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/base/services/base.service";
import { FollowerEntity } from "./entities/follower.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { FollowDto } from "./dto/follow.dto";
import { HttpCustomResponse } from "src/utils/http/responses/http-custom.response";
import { UserService } from "../users/user.service";

@Injectable()
export class FollowerService extends BaseService<FollowerEntity> {
  protected readonly logger = new Logger(FollowerService.name);

  constructor(
    @InjectRepository(FollowerEntity)
    private repository: Repository<FollowerEntity>,
    private dataSource: DataSource,
    private readonly userService: UserService
  ) {
    super(repository);
  }

  async addFollow(currentUser: UserEntity, followDto: FollowDto): Promise<HttpCustomResponse> {
    try {
      if (currentUser.id == followDto.userId) {
        throw new ConflictException("This operation is not allowed !");
      }

      const followed: UserEntity = await this.userService.findById(followDto.userId);
      if (!followed) {
        throw new NotFoundException(`User not found with id: ${followDto.userId}`);
      }

      const didFollow: boolean = await this.existBy({ followerId: currentUser.id, followedId: followed.id });

      if (didFollow) {
        throw new ConflictException(`You already followed user with id ${followDto.userId}`);
      }

      const follow: FollowerEntity = new FollowerEntity();
      follow.follower = currentUser;
      follow.followed = followed;

      ++currentUser.following;
      ++followed.followers;

      await this.dataSource.transaction(async (manager) => {
        manager.save(follow);
        manager.save(currentUser);
        manager.save(followed);
      });

      return new HttpCustomResponse("User successfully created.", follow);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
