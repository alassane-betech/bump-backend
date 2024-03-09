import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return "Hello World!";
  }
}
