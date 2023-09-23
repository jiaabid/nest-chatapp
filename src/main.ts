import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { BannerModule } from './banner/banner.module';
import { AboutUsModule } from './about-us/about-us.module';
import { SchoolModule } from './school/school.module';
import { PageModule } from './page/page.module';
import { SectionModule } from './section/section.module';
import { EventModule } from './event/event.module';
import { AssetModule } from './asset/asset.module';
import { ServiceModule } from './service/service.module';
import { ValueModule } from './value/value.module';
import { HomepageModule } from './homepage/homepage.module';
import { TopStudentsModule } from './top-students/top-students.module';
import { CounterModule } from "./counter/counter.module";
import { PartnersModule } from "./partners/partners.module";

// import { DefaultEntities } from './utils/initial-script.utility';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Chat App')
    .setDescription('Chat App API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      RoleModule,
      UserModule,
      BannerModule,
      AboutUsModule,
      SchoolModule,
      PageModule,
      SectionModule,
      EventModule,
      AssetModule,
      ServiceModule,
      ValueModule,
      HomepageModule,
      TopStudentsModule,
      CounterModule,
      PartnersModule
    ],
  });
  SwaggerModule.setup('apis', app, document);

  await app.listen(3000);
}
bootstrap();
