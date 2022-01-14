import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
  Response,
  StreamableFile, Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataBaseService } from '../data-base/data-base.service';
import * as fs from 'fs';
import { Helper } from '../../helper';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('media')
export class MediaController {

  constructor(private db: DataBaseService) {
  }

  baseDir = join(__dirname, '/./files/');

  @Post('upload')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async upload(@UploadedFile() file: any, @Body('info') infoInput:any, @Request() req) {
    if (file && req.user){
      let info = {};
      if (infoInput){
        try {
          info = JSON.parse(infoInput);
        }catch (e) {
          info = {};
        }
      }
      const Id = this.db.getNextId('files');
      const uid = Helper.newGuid();
      if (!fs.existsSync(this.baseDir)) {
        fs.mkdirSync(this.baseDir);
      }
      await fs.writeFileSync(this.baseDir+uid, file.buffer);
      this.db.db.getCollection('files').insert({...info, Id, UserId:req.user.userId, Name:file.originalname, mimetype:file.mimetype, uid});
    }
  }

  @Get('download/:id')
  download(@Param() params: {id:string}, @Request() req, @Response({ passthrough: true }) res) {
    const file = this.db.db.getCollection('files').by('Id',parseInt(params.id,10));
    /*if ( file.buffer instanceof Buffer){
      return new StreamableFile(file.buffer,{type:file.mimetype});
    }else{
      return new StreamableFile(Buffer.from(file.buffer.data),{type:file.mimetype});
    }*/
    const realFile = createReadStream(this.baseDir+file.uid);
    console.log(file.mimetype);
    return new StreamableFile(realFile, {type:file.mimetype});
  }

  @Get('delete/:id')
  async delete(@Param() params: {id:string}, @Request() req) {
    const file = this.db.db.getCollection('files').by('Id', parseInt(params.id,10));
    await fs.unlinkSync(this.baseDir+file.uid);
    this.db.db.getCollection('files').removeWhere({Id:parseInt(params.id,10), UserId:req.user.userId});
  }

  @Get('my')
  myFiles(@Request() req) {
    return this.db.getCollection('files').find({ UserId: req.user.userId });
  }

  @Post('find')
  find(@Request() req, @Body() info:any) {
    return this.db.getCollection('files').find({...info, UserId:req.user.userId});
  }

}
