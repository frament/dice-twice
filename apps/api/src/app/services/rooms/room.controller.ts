import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.service';
import { RoomsService } from './rooms.service';
import { roomStates } from './full-room-info';

@Controller('room')
export class RoomController {
  constructor(private room: RoomsService) {
  }

  @Get('add/:name')
  add(@Param() params:{name:string}, @Request() req) {
    return this.room.addRoom(params.name, req.user.userId);
  }

  @Get('delete/:id')
  delete(@Param() params:{id:string}, @Request() req) {
    return this.room.deleteRoom(parseInt(params.id,10), req.user.userId);
  }

  @Get('watch/:id')
  watch(@Param() params:{id:string}, @Request() req) {
    return this.room.addWatcherToRoom(parseInt(params.id,10), req.user.userId);
  }

  @Get('play/:id')
  play(@Param() params:{id:string}, @Request() req) {
    return this.room.addPlayerToRoom(parseInt(params.id,10), req.user.userId);
  }

  @Get('myrooms')
  myRooms(@Request() req) {
    return this.room.getMyRooms(req.user.userId);
  }

  @Get('fullInfo/:id')
  fullInfo(@Param() params:{id:string}) {
    return this.room.getRoomInfo(parseInt(params.id,10));
  }

  @Get('set_state/:id/:state')
  setState(@Param() params:{id:string, state:roomStates}) {
    return this.room.updateRoom(parseInt(params.id,10),{state: params.state});
  }

  @Get('players/:id')
  players(@Param() params:{id:string}) {
    return this.room.getRoomPlayers(parseInt(params.id,10));
  }

  @Get('invite/:id/:idPlayer')
  invite(@Param() params:{id:string}) {
    return 'ok';
  }

  @Get('add-hero/:id/:idPlayer/:idHero')
  addHero(@Param() params:{id:string}) {
    return 'ok';
  }

  @Get('heroes/:id')
  heroes(@Param() params:{id:string}) {
    return this.room.getRoomHeroes(parseInt(params.id,10));
  }

}
