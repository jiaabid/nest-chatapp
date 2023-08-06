import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  //Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle("Chat App")
    .setDescription("Chat App API Documentation")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config, {
      include: [RoleModule,UserModule],
  
    });
    SwaggerModule.setup("apis", app, document);
  await app.listen(3000);
}
bootstrap();
