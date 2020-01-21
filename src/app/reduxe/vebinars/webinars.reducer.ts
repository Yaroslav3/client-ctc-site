import {InfoWebinars, Webinars} from './webinars.action';
const initialTrainings = {
  webinars: [],
  webinarsInscription: []
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
    default :
      return state;
  }
}
