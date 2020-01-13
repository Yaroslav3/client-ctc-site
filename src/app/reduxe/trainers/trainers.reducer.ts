import {LoadingTrainers} from './trainers.actions';
import {InfoTrainers} from './trainers.actions';
const initialTrainers = {
    trainers: [],
};


export function loadingTrainersReducer(state = initialTrainers, action: InfoTrainers) {
  switch (action.type) {
    case LoadingTrainers.TrainersAll:
      return {
        ...state,
        trainers: action.payload
      };
    default:
      return state;
  }
}
