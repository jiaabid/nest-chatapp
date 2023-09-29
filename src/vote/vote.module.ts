import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { Vote, VoteSchema } from './entities/vote.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteResult, VoteResultSchema } from './entities/vote-result.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema },{ name: VoteResult.name, schema: VoteResultSchema }])],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
