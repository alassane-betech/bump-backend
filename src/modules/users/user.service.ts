import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/services/base.service";
import { hashPassword } from "src/utils/password";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  protected name = "app.users";
  protected readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {
    super(repository);
  }

  async createUser({ username, email, password: plainTextPassword, ...rest }: CreateUserDto) {
    const isEmailExist = await this.isEmailExist(email);

    if (isEmailExist) {
      throw new ConflictException("Email already exist");
    }

    const isUsernameExist = await this.isUsernameExist(username);

    if (isUsernameExist) {
      throw new ConflictException("Username already exist");
    }

    const password = await hashPassword(plainTextPassword);

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
}
