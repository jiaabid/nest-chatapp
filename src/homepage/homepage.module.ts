import { Module } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Homepage, HomePageSchema } from './entities/homepage.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Homepage.name, schema: HomePageSchema },
    ]),
  ],
  controllers: [HomepageController],
  providers: [HomepageService],
})
export class HomepageModule {}
