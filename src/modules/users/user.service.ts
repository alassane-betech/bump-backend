import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/services/base.service";
import { Equal, Not, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { BcryptService } from "../auth/services/bcrypt.service";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";
import { PageOptionsDto } from "src/core/pagination/dto/page-options.dto";
import { IPage } from "src/core/pagination";
import { PageMetaDto } from "src/core/pagination/dto/page-meta.dto";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  protected readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService
  ) {
    super(repository);
  }

  async createUser({ username, email, password: plainTextPassword, ...rest }: CreateUserDto): Promise<UserEntity> {
    const isEmailExist = await this.isEmailExist(email);

    if (isEmailExist) {
      throw new ConflictException("Email already exist");
    }

    const isUsernameExist = await this.isUsernameExist(username);

    if (isUsernameExist) {
      throw new ConflictException("Username already exist");
    }

    const password = await this.bcryptService.hashPassword(plainTextPassword);

    return super.create({ username, email, password, ...rest });
  }

  async isEmailExist(email: string) {
    const foundEmail = await this.repository.findOneBy({ email });

    return !!foundEmail;
  }

  async isUsernameExist(username: string) {
    const foundUsername = await this.repository.findOneBy({ username });

    return !!foundUsername;
  }

  async updateMyProfileInfos({ id }: UserEntity, payload: UpdateUserProfileDto) {
    if (payload.username) {
      const isUsernameExist = await this.existBy({ id: Not(Equal(id)), username: payload.username });

      if (isUsernameExist) {
        throw new ConflictException("Username already exist");
      }
    }
    return this.update({ id, ...payload });
  }

  async findAllFollowersByUserId(userId: string, pageOption: PageOptionsDto): Promise<IPage<UserEntity>> {
    try {
      const { skip, take } = pageOption;

      const [users, total] = await this.repository
        .createQueryBuilder("users")
        .innerJoinAndSelect("users.followers", "followers")
        .where("followers.followingId = :userId", { userId })
        .skip(skip)
        .take(take)
        .select([
          "users.id",
          "users.createdAt",
          "users.firstname",
          "users.lastname",
          "users.username",
          "users.description",
          "users.profilePicture",
          "users.points",
          "users.totalFollowing",
          "users.totalFollowers"
        ])
        .getManyAndCount();

      const meta: PageMetaDto = new PageMetaDto(pageOption, total, users.length);

      return { data: users, meta };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAllFollowingsByUserId(userId: string, pageOption: PageOptionsDto): Promise<IPage<UserEntity>> {
    try {
      const { skip, take } = pageOption;

      const [users, total] = await this.repository
        .createQueryBuilder("users")
        .innerJoinAndSelect("users.followings", "followings")
        .where("followings.followerId = :userId", { userId })
        .skip(skip)
        .take(take)
        .select([
          "users.id",
          "users.createdAt",
          "users.firstname",
          "users.lastname",
          "users.username",
          "users.description",
          "users.profilePicture",
          "users.points",
          "users.totalFollowing",
          "users.totalFollowers"
        ])
        .getManyAndCount();

      const meta: PageMetaDto = new PageMetaDto(pageOption, total, users.length);

      return { data: users, meta };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
