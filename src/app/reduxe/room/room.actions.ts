import {Action} from 'redux';

export enum LoadingRoom {
  AllRoom = 'ALL_ROOM',
  RoomDataHourlyOrder = 'ROOM_DATA_HOURLY_ORDER',
  RoomChoiceOfDays = 'ROOM_CHOICE_OF_DAYS',
  FormName = 'FORM_NAME',
  FormEmail = 'FORM_EMAIL',
  FormPhone = 'FORM_PHONE',
  FormDescriptions = 'FORM_DESCRIPTIONS'
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

// _________Form Order_____
export class FormNameOrderRoom implements Action {
  readonly type = LoadingRoom.FormName;
  constructor(public payload) {
  }
}

export class FormEmailOrderRoom implements Action {
  readonly type = LoadingRoom.FormEmail;
  constructor(public payload) {
  }
}

export class FormPhoneOrderRoom implements Action {
  readonly type = LoadingRoom.FormPhone;
  constructor(public payload) {
  }
}

export class FormDescriptionsOrderRoom implements Action {
  readonly type = LoadingRoom.FormDescriptions;
  constructor(public payload) {
  }
}

export type InfoLoadingRoom = AllRoomData
  | HourlyOrder
  | ChoiceOfDays
  | FormNameOrderRoom
  | FormEmailOrderRoom
  | FormPhoneOrderRoom
  | FormDescriptionsOrderRoom;
