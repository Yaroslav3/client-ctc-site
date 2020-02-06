import {InfoLoadingRoom, LoadingRoom} from './room.actions';
const initialStateRoom = {
  roomRental: [],
  dataHourlyOrder: [],
  dataChoiceOfDays: []
};
export function loadingRoomsReducer(state = initialStateRoom, action: InfoLoadingRoom) {
  switch (action.type) {
    case LoadingRoom.AllRoom:
      return {
        ...state,
        roomRental: action.payload
      };
    case LoadingRoom.RoomDataHourlyOrder:
      return {
        ...state,
        dataHourlyOrder: action.payload
      };
    case LoadingRoom.RoomChoiceOfDays:
      return {
        ...state,
        dataChoiceOfDays: action.payload
      };
    default:
      return state;
  }
}
