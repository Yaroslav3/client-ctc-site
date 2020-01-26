import {InfoTrainings, OrderTrainings, Trainings} from './trainings.action';
const initialTrainings = {
    trainings: [],
    trainingOrder: {
      date: '',
      training: '',
      country: '',
      city: '',
      nameCompany: '',
      nameSurname: '',
      phone: '',
      email: '',
      description: ''
    }
  }
;
export function loadingTrainingsReducer(state = initialTrainings, action: InfoTrainings) {
  switch (action.type) {
    case Trainings.TrainingsAll:
      return {
        ...state,
        trainings: action.payload
      };
    case OrderTrainings.Date:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          date: action.payload
        }
      };
    case OrderTrainings.Training:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          training: action.payload
        }
      };
    case OrderTrainings.Country:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          country: action.payload
        }
      };
    case OrderTrainings.City:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          city: action.payload
        }
      };
    case OrderTrainings.NameSurname:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          nameSurname: action.payload
        }
      };
    case OrderTrainings.NameCompany:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          nameCompany: action.payload
        }
      };
    case OrderTrainings.Phone:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          phone: action.payload
        }
      };
    case OrderTrainings.Email:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          email: action.payload
        }
      };
    case OrderTrainings.Description:
      return {
        ...state,
        trainingOrder: {
          ...state.trainingOrder,
          description: action.payload
        }
      };
    default :
      return state;
  }
}

