import { Injectable } from "@nestjs/common";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdatePartnerDto } from "./dto/update-partner.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Partner } from "./entities/partner.entity";
import { Model } from "mongoose";
import { generateMessage } from "../utils/message.utility";
import { Response } from "../utils/response.utility";

@Injectable()
export class PartnersService {
  constructor(@InjectModel(Partner.name) private partnerModel: Model<Partner>) {
  }

  private MESSAGES = generateMessage("Partner");
  private StatusCode = 200;

  async create(createPartnerDto: CreatePartnerDto) {
    try {
      const exists = await this.partnerModel.findOne({
        name: createPartnerDto.name
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdPartner = await this.partnerModel.create(
        createPartnerDto
      );
      return new Response(
        this.StatusCode = 201,
        this.MESSAGES.CREATED,
        createdPartner
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const partner = await this.partnerModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, partner);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const partner = await this.partnerModel.findById(id);
      if (!partner) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, partner);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      const partner = await this.partnerModel.findById(id);
      if (Object.values(partner).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(partner).forEach((key) => {
        partner[key] = updatePartnerDto[key];
      });
      await this.partnerModel.findByIdAndUpdate(id, updatePartnerDto);
      const updated = await this.partnerModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.partnerModel.deleteOne({
        _id: id
      });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST);
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, []);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
