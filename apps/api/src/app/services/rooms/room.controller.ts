import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomAudio, RoomMainShow, roomStates } from './room';

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

  @Post('set_main_show/:id')
  setMainShow(@Param('id') roomId:string, @Body() mainShow:RoomMainShow, @Request() req) {
    return this.room.updateRoom(parseInt(roomId,10),{mainShow});
  }

  @Post('set_audio/:id')
  setAudio(@Param('id') roomId:string, @Body() audio:RoomAudio, @Request() req) {
    return this.room.updateRoom(parseInt(roomId,10),{audio});
  }

  @Get('players/:id')
  players(@Param() params:{id:string}) {
    return this.room.getRoomPlayers(parseInt(params.id,10));
  }

  @Get('players_heroes/:id')
  playersHeroes(@Param() params:{id:string}) {
    return this.room.getRoomPlayersHeroes(parseInt(params.id,10));
  }

  @Get('join/:id/:uid')
  joinPlayer(@Param('id') id:string, @Param('uid') uid:string, @Request() req) {
    const room = this.room.byId(parseInt(id,10));
    if (uid === room.playerGuid && room.Players.findIndex(x=>x.playerId === req.user.userId) === -1){
      room.Players.push({playerId:req.user.userId,heroId:0});
    }
    if (uid === room.watcherGuid && room.Watchers.findIndex(x=>x === req.user.userId) === -1){
      room.Watchers.push(req.user.userId);
    }
  }

  @Get('add-hero/:id/:idPlayer/:idHero')
  addHero(@Param() params:{id:string}) {
    return 'ok';
  }

}
