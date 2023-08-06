import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
// import { env } from 'process';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'chat-client'),
      exclude: ['/api/(.*)'],
    }),
    MongooseModule.forRoot( process.env.DATABASE_URL,{dbName:process.env.DATABASE_NAME}),
    RoleModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService,ChatGateway],
})
export class AppModule {}
