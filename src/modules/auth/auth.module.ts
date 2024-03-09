import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../users/user.module";
import { JWT_SECRET_KEY } from "src/environments";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { BcryptService } from "./services/bcrypt.service";

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: "30d" }
    })
  ],
  providers: [AuthService, BcryptService],
  controllers: [AuthController],
  exports: [AuthService, BcryptService]
})
export class AuthModule {}
