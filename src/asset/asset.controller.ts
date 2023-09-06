import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFiles } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer'
import {extname} from 'path'


import {
  ApiBearerAuth,
  ApiBody,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiBearerAuth()
@ApiTags('Asset Module')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @Post()
  @UseInterceptors(FilesInterceptor('files',10,{
    storage:diskStorage({
      destination:process.env.ASSET_PATH,
      filename:(req:any,file:any,cb:any)=>{
        console.log(file.originalname)
        cb(null,`${file.originalname}${extname(file.originalname)}`)
      }
    })
  }))
  @ApiBody({
  schema:{
    type:'object',
    properties:{
      files:{type:'array',example:["Array of files"]},
      type:{type:'string',example:"image/video"},
    }
  }})
  create(@UploadedFiles() files, @Body('type') type:string ) {
    return this.assetService.create(files,type);
  }
  
}
