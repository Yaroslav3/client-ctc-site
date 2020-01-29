import {InfoStartApplication, StartLoadingInfoApplication} from './startApplication.actions';
const initialState = {
  photoHeader: [],
  footerInfo: [],
  inscriptions: [],
  dataCalendar: []
};
export function startApplicationReducer(state = initialState, action: InfoStartApplication) {
  switch (action.type) {
    case StartLoadingInfoApplication.AddPhoto:
      return {
        ...state,
        photoHeader: action.payload
      };
    case StartLoadingInfoApplication.FooterInfoData:
      return {
        ...state,
        footerInfo: action.payload
      };
    case StartLoadingInfoApplication.AllInscriptions:
      return {
        ...state,
        inscriptions: action.payload
      };
    case StartLoadingInfoApplication.AllEventCalendarDate:
      return {
        ...state,
        dataCalendar: action.payload
      };
    default:
      return state;
  }
}
