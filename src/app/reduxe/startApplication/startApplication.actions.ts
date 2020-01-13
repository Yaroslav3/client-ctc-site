import {Action} from '@ngrx/store';


export enum StartLoadingInfoApplication {
  AddPhoto = 'AddPhoto',
  FooterInfoData = 'FooterInfoData',


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

export type InfoStartApplication =
  AddPhoto | InfoFooter  ;
