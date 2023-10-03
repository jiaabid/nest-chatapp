import { Module } from '@nestjs/common';
import { ContactformService } from './contactform.service';
import { ContactformController } from './contactform.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './entities/contactform.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }])],
  controllers: [ContactformController],
  providers: [ContactformService]
})
export class ContactformModule {}
