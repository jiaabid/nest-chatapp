import { Module } from '@nestjs/common';
import { TopStudentsService } from './top-students.service';
import { TopStudentsController } from './top-students.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { TopStudent, TopStudentsSchema } from "./entities/top-student.entity";

@Module({
  imports: [MongooseModule.forFeature([{name: TopStudent.name, schema: TopStudentsSchema}])],
  controllers: [TopStudentsController],
  providers: [TopStudentsService],
})
export class TopStudentsModule {}
