import {InfoLoadingRoom, LoadingRoom} from './room.actions';
const initialStateRoom = {
  roomRental: []
};
export function loadingRoomsReducer(state = initialStateRoom, action: InfoLoadingRoom) {
  switch (action.type) {
    case LoadingRoom.AllRoom:
      return {
        ...state,
        roomRental: action.payload
      };
    default:
      return state;
  }
}
