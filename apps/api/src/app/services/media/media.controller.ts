import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataBaseService } from '../data-base/data-base.service';

@Controller('media')
export class MediaController {

  constructor(private db: DataBaseService) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('thumbnail'))
  getProfile(@UploadedFile() file: any, @Request() req) {
    if (file && req.user){
      const Id = this.db.getNextId('files');
      this.db.db.getCollection('files').insert({Id,UserId:req.user.userId, Name:file.originalname, file});
    }
  }

  @Get('download/:id')
  download(@Param() params: {id:string}, @Request() req, @Response({ passthrough: true }) res) {
    const file = this.db.db.getCollection('files').by('Id',parseInt(params.id,10))?.file;
    if ( file.buffer instanceof Buffer){
      return new StreamableFile(file.buffer,{type:file.mimetype});
    }else{
      return new StreamableFile(Buffer.from(file.buffer.data),{type:file.mimetype});
    }
  }

  @Get('delete/:id')
  delete(@Param() params: {id:string}, @Request() req) {
    this.db.db.getCollection('files').removeWhere({Id:parseInt(params.id,10), UserId:req.user.userId});
  }

  @Get('my')
  myFiles(@Request() req) {
    return this.db.db.getCollection('files').find({UserId:req.user.userId})
      .map(({Id,Name})=>({Id,Name}))
  }

}
