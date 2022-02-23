import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { DataBaseService } from '../data-base/data-base.service';
import { Hero } from './hero';

@Controller('hero')
export class HeroController {

  constructor(private db: DataBaseService) {
  }

  @Post('add')
  add(@Body() hero:Partial<Hero>, @Request() req) {
    return this.db.getCollection('heroes').insert(new Hero({...hero, Id:this.db.getNextId('heroes')}));
  }

  @Get('get/:id')
  get(@Param('id') id:string, @Request() req) {
    return this.db.getCollection('heroes').by('Id',parseInt(id,10));
  }

  @Post('update/:id')
  update(@Body() hero:Partial<Hero>, @Param('id') id:string, @Request() req) {
    this.db.getCollection('heroes').findAndUpdate({Id:parseInt(id,10)}, obj => Object.assign(obj, hero));
    return this.db.getCollection('heroes').by('Id',parseInt(id,10));
  }

  @Get('delete/:id')
  delete(@Param('id') id:string, @Request() req) {
    this.db.getCollection<Hero>('heroes').removeWhere({Id:parseInt(id,10), IdUser:req.user.userId});
  }

  @Get('my')
  my(@Request() req) {
    return this.db.getCollection<Hero>('heroes').find({IdUser:req.user.userId});
  }

}
