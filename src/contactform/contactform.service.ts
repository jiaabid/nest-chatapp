import { Injectable } from '@nestjs/common';
import { CreateContactformDto } from './dto/create-contactform.dto';
import { UpdateContactformDto } from './dto/update-contactform.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form } from './entities/contactform.entity';
import { generateMessage } from 'src/utils/message.utility';
import { objectIsEmpty } from 'src/utils/wrapper.utility';
import { Response } from 'src/utils/response.utility';
import { sendEmail } from 'src/utils/email.utility';

@Injectable()
export class ContactformService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) { }

  private MESSAGES = generateMessage('Form')
  private StatusCode: number = 200;
  async create(createFormDto: CreateContactformDto) {
    try {
      // const exists = await this.formModel.findOne({
      //   name: createFormDto.name
      // })
      // if (!(objectIsEmpty(exists))) {
      //   this.StatusCode = 400;
      //   throw new Error(this.MESSAGES.EXIST)
      // }
      const createdForm = await this.formModel.create(createFormDto);
      await sendEmail({
        subject:"Contact Form Created",
        body:`
        <h3>Form Data</h3>
        <p><b>title: <b/>${createFormDto.title}</p>
        <p><b>parentName: <b/>${createFormDto.parentFirstName} ${createFormDto.parentLastName}</p>
        <p><b>childName: <b/>${createFormDto.childFirstName} ${createFormDto.childLastName}</p>
        <p><b>schoolName: <b/>${createFormDto.schoolName}</p>
        <p><b>phoneNumber: <b/>${createFormDto.phoneNumber}</p>
        <p><b>email: <b/>${createFormDto.email}</p>
        <p><b>status: <b/>${createFormDto.status}</p>
        <p><b>contactEmail: <b/>${createFormDto.contactEmail}</p>
        <p><b>contactPhone: <b/>${createFormDto.contactPhone}</p>
        `
      })
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdForm)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll( ) {
    try {
      const forms = await this.formModel.find();
      return new Response(this.StatusCode=200, this.MESSAGES.RETRIEVEALL, forms)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findOne(id: string) {
    try {
      const form = await this.formModel.findById(id);
      if (!form) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      return new Response(this.StatusCode=200, this.MESSAGES.RETRIEVE, form)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }
//hello
}
