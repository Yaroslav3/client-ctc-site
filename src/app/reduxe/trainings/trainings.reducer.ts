import {InfoTrainings, Trainings} from './trainings.action';

const initialTrainings = {
  trainings: []
};

export function loadingTrainingsReducer(state = initialTrainings, action: InfoTrainings) {
  switch (action.type) {
    case Trainings.TrainingsAll:
      return {
        ...state,
        trainings: action.payload
      };
    default :
      return state;
  }
}
