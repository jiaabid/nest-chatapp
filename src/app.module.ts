import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateway } from './chat/socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import { DefaultSeed } from './seeder/default.seeder';
import { Role, RoleSchema } from './role/entities/role.entity';
import { User, UserSchema } from './user/entities/user.entity';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { VisitorModule } from './visitor/visitor.module';
import { BannerModule } from './banner/banner.module';
import { AboutUsModule } from './about-us/about-us.module';
import { SchoolModule } from './school/school.module';
import { PageModule } from './page/page.module';
import { SectionModule } from './section/section.module';
import { EventModule } from './event/event.module';
import { AssetModule } from './asset/asset.module';
import { ValueModule } from './value/value.module';
import { ServiceModule } from './service/service.module';
import { HomepageModule } from './homepage/homepage.module';
import { VoteModule } from './vote/vote.module';
import { TopStudentsModule } from './top-students/top-students.module';
import { CounterModule } from './counter/counter.module';
import { PartnersModule } from './partners/partners.module';
import { NewsModule } from './news/news.module';
import { ContactformModule } from './contactform/contactform.module';
import { CommanderModule } from './commander/commander.module';
import { SocialModule } from './social/social.module';
import { TalentModule } from './talent/talent.module';
import { QualityEduModule } from './quality-edu/quality-edu.module';
import { ValuesEduModule } from './values-edu/values-edu.module';
import { ParentsModule } from './parents/parents.module';
import { AwardsModule } from './awards/awards.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'chat-client'),
      exclude: ['/api/(.*)'],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    }),
    UserModule,
    RoleModule,
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ChatModule,
    RoomModule,
    VisitorModule,
    BannerModule,
    AboutUsModule,
    SchoolModule,
    PageModule,
    SectionModule,
    CommanderModule,
    EventModule,
    AssetModule,
    ValueModule,
    ServiceModule,
    HomepageModule,
    VoteModule,
    TopStudentsModule,
    CounterModule,
    PartnersModule,
    NewsModule,
    ContactformModule,
    SocialModule,
    TalentModule,
    QualityEduModule,
    ValuesEduModule,
    ParentsModule,
    AwardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DefaultSeed],
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
