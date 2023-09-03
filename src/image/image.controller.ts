import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage} from 'multer'
import {extname} from 'path'

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./images',
      filename:(req:any,file:any,cb:any)=>{
        console.log(file.originalname)
        cb(null,`${file.originalname}${extname(file.originalname)}`)
      }
    })
  }))
  create(@UploadedFile() file) {
    return this.imageService.create(file);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
