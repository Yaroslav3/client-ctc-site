import {InfoLoadingRoom, LoadingRoom} from './room.actions';
const initialStateRoom = {
  roomRental: [],
  dataHourlyOrder: [],
  dataChoiceOfDays: [],
  orderFormRoom: {
    name: '',
    email: '',
    phone: '',
    description: ''
  }
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
    case LoadingRoom.FormName:
      return {
        ...state,
        orderFormRoom: {
          ...state.orderFormRoom,
          name: action.payload
        }
      };
    case LoadingRoom.FormEmail:
      return {
        ...state,
        orderFormRoom: {
          ...state.orderFormRoom,
          email: action.payload
        }
      };
    case LoadingRoom.FormPhone:
      return {
        ...state,
        orderFormRoom: {
          ...state.orderFormRoom,
          phone: action.payload
        }
      };
    case LoadingRoom.FormDescriptions:
      return {
        ...state,
        orderFormRoom: {
          ...state.orderFormRoom,
          description: action.payload
        }
      };
    default:
      return state;
  }
}
