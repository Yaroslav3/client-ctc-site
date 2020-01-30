import {RoomPrice} from './RoomPrice.model';
import {RoomArticle} from './RoomArticle.model';
import {PhotoRoom} from './PhotoRoom.model';

export class Room {
  id: number;
  nameRoom: string;
  roomCapacity: number;
  priseRoom: RoomPrice;
  articleRoom: RoomArticle;
  photoRoom: PhotoRoom;
}
