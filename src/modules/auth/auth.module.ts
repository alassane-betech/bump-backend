import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../users/user.module";
import { JWT_SECRET_KEY } from "src/environments";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { BcryptService } from "./services/bcrypt.service";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: "1d" }
    })
  ],
  providers: [AuthService, BcryptService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
