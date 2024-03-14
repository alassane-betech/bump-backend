import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT, SERVICE_PREFIX } from "./environments";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig, swaggerOptions } from "./config/doc/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix(SERVICE_PREFIX);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document, swaggerOptions);

  await app.listen(PORT!);
}
bootstrap();
