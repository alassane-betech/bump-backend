import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./services/auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthResponse } from "src/utils/http/responses/auth.reponse";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { HttpCustomResponse } from "src/utils/http/responses/http-custom.response";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return await this.authService.register(registerDto);
  }

  @Post("signin")
  async login(@Body() itemDto: LoginDto): Promise<AuthResponse> {
    return await this.authService.login(itemDto);
  }

  @Post("change-password")
  async changePassword(@Body() itemDto: ChangePasswordDto): Promise<HttpCustomResponse> {
    return await this.authService.changePassword(itemDto);
  }
}
