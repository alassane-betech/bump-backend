import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/base/services/base.service";
import { FollowerEntity } from "./entities/follower.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { FollowDto } from "./dto/follow.dto";
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

  async addFollow(currentUser: UserEntity, followDto: FollowDto): Promise<FollowerEntity> {
    try {
      if (currentUser.id == followDto.userId) {
        throw new ConflictException("This operation is not allowed !");
      }

      const following: UserEntity = await this.userService.findById(followDto.userId);
      if (!following) {
        throw new NotFoundException(`User not found with id: ${followDto.userId}`);
      }

      const didFollow: boolean = await this.existBy({ followerId: currentUser.id, followingId: following.id });

      if (didFollow) {
        throw new ConflictException(`You already followed user with id ${followDto.userId}`);
      }

      let follow: FollowerEntity = new FollowerEntity();
      follow.follower = currentUser;
      follow.following = following;

      ++currentUser.totalFollowing;
      ++following.totalFollowers;

      await this.dataSource
        .transaction(async (manager) => {
          follow = await manager.save(follow);
          await manager.save(currentUser);
          await manager.save(following);
        })
        .then((value) => {
          console.log("Value here => ", value);
        });

      return follow;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async unfollow(currentUser: UserEntity, followDto: FollowDto): Promise<FollowerEntity> {
    try {
      const following: UserEntity = await this.userService.findById(followDto.userId);
      if (!following) {
        throw new NotFoundException(`User not found with id: ${followDto.userId}`);
      }

      const follow: FollowerEntity = await this.findOneBy({ followerId: currentUser.id, followingId: following.id });

      if (!follow) {
        throw new NotFoundException(`You're not following user with id ${following.id}`);
      }

      --currentUser.totalFollowing;
      --following.totalFollowers;

      await this.dataSource.transaction(async (manager) => {
        await manager.delete(FollowerEntity, { id: follow.id });
        await manager.save(currentUser);
        await manager.save(following);
      });

      return follow;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
