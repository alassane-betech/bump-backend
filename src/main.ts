import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT, SERVICE_PREFIX } from "./environments";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(SERVICE_PREFIX);

  await app.listen(PORT!);
}
bootstrap();
