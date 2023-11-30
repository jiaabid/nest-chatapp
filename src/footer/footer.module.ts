import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Footer, FooterSchema } from 'src/footer/entities/footer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Footer.name, schema: FooterSchema }]),
  ],
  controllers: [FooterController],
  providers: [FooterService],
})
export class FooterModule {}
