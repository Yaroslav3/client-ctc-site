import {Action} from 'redux';

export enum LoadingRoom {
  AllRoom = 'ALL_ROOM',
  RoomDataHourlyOrder = 'ROOM_DATA_HOURLY_ORDER',
  RoomChoiceOfDays = 'ROOM_CHOICE_OF_DAYS'
}

export class AllRoomData implements Action {
  readonly type = LoadingRoom.AllRoom;
  constructor(public payload) {
  }
}

export class HourlyOrder implements Action {
  readonly type = LoadingRoom.RoomDataHourlyOrder;
  constructor(public payload) {
  }
}

export class ChoiceOfDays implements Action {
  readonly type = LoadingRoom.RoomChoiceOfDays;
  constructor(public payload) {
  }
}

export type InfoLoadingRoom = AllRoomData | HourlyOrder | ChoiceOfDays ;
