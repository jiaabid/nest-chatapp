import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImageService {
          

  async create(file) {
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME, 
      api_key: process.env.APIKEY, 
      api_secret: process.env.APISECRET 
    })
    let result = await cloudinary.uploader.upload(file.path) 
    return result;
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
