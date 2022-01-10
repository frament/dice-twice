import { FullRoomInfo } from './full-room-info';

export type Room = Pick<FullRoomInfo, 'Id'|'Name'|'state'>
