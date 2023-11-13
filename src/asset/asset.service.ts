import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path'
import { Response } from 'src/utils/response.utility';
import { generateMessage } from 'src/utils/message.utility';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AssetService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.APIKEY,
      api_secret: process.env.APISECRET
    })
  }
  private MESSAGES = generateMessage('Assets')
  private StatusCode: number = 200;
  // private 


  async create(files, type) {
    try {
      if (files.length == 0) {
        return new Response(this.StatusCode = 400, this.MESSAGES.BADREQUEST, {}).error()
      }
      let uploadPromises = files.map(file => {
        console.log(file.mimeType, file)
        let mimetype = file.mimetype.slice(0,file.mimetype.indexOf("/"))
        console.log(mimetype)
        return cloudinary.uploader.upload(file.path, {
          resource_type: mimetype
        })
      })
      let result = await Promise.all(uploadPromises);
      files.forEach(file => {
        try {
          fs.unlinkSync(file.path)

        } catch (Err) {
          console.log(Err)
          this.StatusCode = 400;
          return new Response(Err.http_code || this.StatusCode, Err?.message, Err).error()

        }
      })
      return new Response(this.StatusCode = 200, this.MESSAGES.CREATED, result)

    } catch (err) {
      this.StatusCode = this.StatusCode == 200 ? err.http_code || 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }
  findAll() {
    return `This action returns all asset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
