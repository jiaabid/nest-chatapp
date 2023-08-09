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
import { ConfigModule } from '@nestjs/config'; import { DefaultSeed } from './seeder/default.seeder';
import { Role, RoleSchema } from './role/entities/role.entity';
import { User, UserSchema } from './user/entities/user.entity';
;

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'chat-client'),
      exclude: ['/api/(.*)'],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, { dbName: process.env.DATABASE_NAME }),
    RoleModule,
    UserModule,
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway,DefaultSeed],
})

//create a default admin
export class AppModule {
  constructor(private readonly seederService: DefaultSeed) {
    this.seedData();
  }
  async seedData() {
    await this.seederService.createDefaultRoles(); // seed default roles
    await this.seederService.createAdmin(); // Seed default admin user
  }
}
