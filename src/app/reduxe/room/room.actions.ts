import {Action} from 'redux';

export enum LoadingRoom {
  AllRoom = 'AllRoom'
}

export class AllRoomData implements Action {
  readonly type = LoadingRoom.AllRoom;
  constructor(public payload) {
  }
}

export type InfoLoadingRoom = AllRoomData;
