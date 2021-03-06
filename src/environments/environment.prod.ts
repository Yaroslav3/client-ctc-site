export const environment = {
  production: true,
  host: 'http://91.211.249.38:8887/ctc/',
  // Video;
  apiUrlVideo: 'api/video/getAll',
  // User;
  apiUrlUser: 'api/user',
  // Trainers;
  apiUrlTrainers: 'api/trainers/get_all_coach',
  apiUrlGetAllNameSkills: 'api/trainers/training/name-id',
  apiUrlTrainersGetOne: 'api/trainers/one_trainings',
  // Trainings;
  apiUrlTrainings: 'api/trainings/all_trainings',
  apiUrlTrainingsGetOne: 'api/trainings/one_trainings',
  apiUrlTrainingsOrder: 'api/save/order',
  apiUrlTrainingsInscriptions: 'api/trainings/inscriptions_trainings',
  apiUrlDownloadPDF: 'api/trainings/download_file',
  // webinars;
  apiUrlWebinarsInscription: 'api/webinars/inscription_webinar',
  apiUrlWebinars: 'api/webinars/all_webinars',
  apiUrlWebinarsGetOne: 'api/webinars/one_webinar',
  apiUrlInvoiceLiqPayWebinars: 'api/webinars/invoice/liqPay',
  apiUrlCreateWebinarOrder: 'api/webinar/order/save',
  apiUrlWebinarOrderStatus: 'api/webinar/order/status',
  // Calendar;
  apiUrlGetAllDateCalendar: 'api/calendar/get_all_data',
  // Room rental;
  apiUrlRoomAll: 'api/room/rental/all_room',
  apiUrlRoomOne: 'api/room/rental/one_room',
  apiUrlRoomAllPhoto: 'api/room/rental/photo/all_photo',
  apiUrlRoomDayTimeOrder: 'api/room/rental/date/get_time_one_day',
  apiUrlRoomPeriodDayOrder: 'api/room/rental/date/get_time_period_day',
  apiUrlCreateRoomOrder: 'api/room/rental/order/create_room',
  apiUrlSaveTimeRoom: 'api/room/rental/date/create_order_time_room',
  apiUrlCheckedTimeRoom: 'api/room/rental/date/checked_time',
};
// customer url (photo start page)
export const eHomePhoto = {
  production: true,
  apiUrlPhotoPageStartGetAll: 'api/photoPage/all_photo',
  apiUrlPhotoPageStartGetOne: 'api/photoPage/getOne',
  apiUrlPhotoNamePhotoPage: 'api/get_name_photo_page'
};
