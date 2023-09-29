import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { Vote, VoteSchema } from './entities/vote.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }])],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
