import { Module } from '@nestjs/common';
import { CommanderService } from './commander.service';
import { CommanderController } from './commander.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Commander, CommanderSchema } from "./entities/commander.entity";

@Module({
  imports: [MongooseModule.forFeature([{name: Commander.name,schema:CommanderSchema}])],
  controllers: [CommanderController],
  providers: [CommanderService],
})
export class CommanderModule {}
