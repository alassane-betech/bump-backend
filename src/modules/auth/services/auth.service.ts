import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException, forwardRef } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BcryptService } from "./bcrypt.service";
import { UserService } from "src/modules/users/user.service";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { LoginDto } from "../dto/login.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { AuthResponse } from "src/utils/http/responses/auth.reponse";
import { HttpCustomResponse } from "src/utils/http/responses/http-custom.response";
import { RegisterDto } from "../dto/register.dto";

@Injectable()
export class AuthService {
  protected readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findOneBy({ email });

      if (!user) {
        throw new NotFoundException(`User not found with email: ${email}`);
      }

      if (!user.activated) {
        throw new UnauthorizedException("User is not activated.");
      }

      const passwordMatch = await this.bcryptService.comparePassword(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException("Incorrect password. Please try again.");
      }

      const token = await this.generateJwtToken(user);

      return new AuthResponse("Login successfully", token);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    try {
      const user: UserEntity = await this.userService.createUser(registerDto);

      const token = await this.generateJwtToken(user);

      return new AuthResponse("User successfully created.", token);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<HttpCustomResponse> {
    try {
      const { email, oldPassword, newPassword } = changePasswordDto;

      const user = await this.userService.findOneBy({ email });
      if (!user) {
        throw new NotFoundException(`User not found with email: ${email}`);
      }

      const passwordMatch = await this.bcryptService.comparePassword(oldPassword, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException("Incorrect password. Please try again.");
      }

      const hashedPassword = await this.bcryptService.hashPassword(newPassword);
      user.password = hashedPassword;

      await this.userService.update(user);

      return new HttpCustomResponse("Password succesfully updated", null);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async generateJwtToken(user: UserEntity): Promise<string> {
    const { id, username, email, firstname, lastname, category } = user;

    const payload = {
      user: {
        sub: id,
        username,
        email,
        firstname,
        lastname,
        category,
        role: category
      }
    };

    return this.jwtService.signAsync(payload);
  }
}
