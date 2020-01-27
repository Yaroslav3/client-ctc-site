import {InfoWebinars, OrderWebinar, Webinars} from './webinars.action';
const initialTrainings = {
  webinars: [],
  webinarsInscription: [],
  orderWebinarForm: {
    name: '',
    email: '',
    phone: ''
  }
};
export function loadingWebinarsReducer(state = initialTrainings, action: InfoWebinars) {
  switch (action.type) {
    case Webinars.WebinarsAll:
      return {
        ...state,
        webinars: action.payload
      };
    case Webinars.WebinarsInscriptionAll:
      return {
        ...state,
        webinarsInscription: action.payload
      };
    case OrderWebinar.NameUser:
      return {
        ...state,
        orderWebinarForm: {
          ...state.orderWebinarForm,
          name: action.payload
        }
      };
    case OrderWebinar.EmailUser:
      return {
        ...state,
        orderWebinarForm: {
          ...state.orderWebinarForm,
          email: action.payload
        }
      };
    case OrderWebinar.PhoneUser:
      return {
        ...state,
        orderWebinarForm: {
          ...state.orderWebinarForm,
          phone: action.payload
        }
      };
    default :
      return state;
  }
}
