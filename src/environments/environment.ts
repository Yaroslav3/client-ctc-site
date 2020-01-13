// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://localhost:8888/',
  // Video;
  apiUrlVideo: 'api/video/getAll',
  // User;
  apiUrlUser: 'api/user',
  // Trainers;
  apiUrlTrainers: 'api/trainers/getAll',
  apiUrlGetAllNameSkills: 'api/trainers/training/name-id',
  apiUrlTrainersGetOne: 'api/trainers/getOne',
  // Trainings;
  apiUrlTrainings: 'api/trainings/getAll',
  apiUrlTrainingsGetOne: 'api/trainings/getOne',
  apiUrlTrainingsOrder: 'api/save/order',
  apiUrlTrainingsInscriptions: 'api/trainings/inscriptions',
  apiUrlDownloadPDF: 'api/trainings/downloadFile',
  // webinars;
  apiUrlWebinarsInscription: 'api/webinars/inscription/getAll',
  apiUrlWebinars: 'api/webinars/getAll',
  apiUrlWebinarsGetOne: 'api/webinars/getOne',
  apiUrlInvoiceLiqPayWebinars: 'api/webinars/invoice/liqPay',
  apiUrlCreateWebinarOrder: 'api/webinar/order/save',
  apiUrlWebinarOrderStatus: 'api/webinar/order/status',
  // Calendar;
  apiUrlGetAllDateCalendar: 'api/calendar/getAll',
  // Room rental;
  apiUrlRoomAll: 'api/room/rental/all',
  apiUrlRoomOne: 'api/room/rental/getOne',
  apiUrlRoomAllPhoto: 'api/room/rental/photo/allPhoto',
  apiUrlRoomDayTimeOrder: 'api/room/rental/date/getTimeOneDay',
  apiUrlRoomPeriodDayOrder: 'api/room/rental/date/getTimePeriodDay',
  apiUrlCreateRoomOrder: 'api/room/rental/order/create',
  apiUrlSaveTimeRoom: 'api/room/rental/date/createOrderTimeRoom',
  apiUrlCheckedTimeRoom: 'api/room/rental/date/checkedTime',
};
// customer url (photo start page)
export const eHomePhoto = {
  production: true,
  apiUrlPhotoPageStartGetAll: 'api/photoPage/getAll',
  apiUrlPhotoPageStartGetOne: 'api/photoPage/gsetOne',
  apiUrlPhotoNamePhotoPage: 'api/getNamePhotoPage'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
