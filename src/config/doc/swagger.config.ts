import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("BUMP API")
  .setDescription("Put some description here")
  .setVersion("1.0")
  // .addTag('')
  .setContact("Alassane Fall", "https://www.be-tech.co/", "alassane@be-tech.co")
  .addBearerAuth({ type: "http", name: "Authorization", scheme: "bearer", in: "header" }, "jwt")
  .build();

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: "BUMP API",
  customCss: ".swagger-ui .topbar { display: none }",
  // customfavIcon: '/assets/images/example.png',
  swaggerOptions: {
    persistAuthorization: true
  }
};
