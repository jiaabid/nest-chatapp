import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parent } from 'src/parents/entities/parent.entity';
import { PartnerSchema } from 'src/partners/entities/partner.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parent.name, schema: PartnerSchema }]),
  ],
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}
