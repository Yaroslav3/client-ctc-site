import {Action} from '@ngrx/store';

export enum StartLoadingInfoApplication {
  AddPhoto = 'AddPhoto',
  FooterInfoData = 'FooterInfoData',
  AllInscriptions = 'AllInscriptions',
  AllEventCalendarDate = 'AllEventCalendarDate'
}

export class AddPhoto implements Action {
  readonly type = StartLoadingInfoApplication.AddPhoto;
  constructor(public payload) {
  }
}

export class InfoFooter implements Action {
  readonly type = StartLoadingInfoApplication.FooterInfoData;
  constructor(public payload) {
  }
}

export class InscriptionsAll implements Action {
  readonly type = StartLoadingInfoApplication.AllInscriptions;
  constructor(public payload) {
  }
}

export class AllEventDateCalendar implements Action {
  readonly type = StartLoadingInfoApplication.AllEventCalendarDate;
  constructor(public payload) {
  }
}

export type InfoStartApplication =
  AddPhoto | InfoFooter | InscriptionsAll | AllEventDateCalendar;
