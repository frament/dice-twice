import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.service';
import { RoomsService } from './rooms.service';

@Controller('room')
export class RoomController {
  constructor(private room: RoomsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('add/:name')
  add(@Param() params:{name:string}, @Request() req) {
    return this.room.addRoom(params.name, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete/:id')
  delete(@Param() params:{id:string}, @Request() req) {
    return this.room.deleteRoom(parseInt(params.id,10), req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('watch/:id')
  watch(@Param() params:{id:string}, @Request() req) {
    return this.room.addWatcherToRoom(parseInt(params.id,10), req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('play/:id')
  play(@Param() params:{id:string}, @Request() req) {
    return this.room.addPlayerToRoom(parseInt(params.id,10), req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myrooms')
  myRooms(@Request() req) {
    return this.room.getMyRooms(req.user.userId);
  }


}
