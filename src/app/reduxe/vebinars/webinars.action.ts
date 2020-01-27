import {Action} from 'redux';

export enum Webinars {
  WebinarsAll = 'WebinarsAll',
  WebinarsInscriptionAll = 'WebinarsInscriptionAll'
}

export enum OrderWebinar {
  NameUser = 'NameUser',
  EmailUser = 'EmailUser',
  PhoneUser = 'PhoneUser'
}

export class AllWebinars implements Action {
  readonly type = Webinars.WebinarsAll;
  constructor(public payload) {
  }
}

export class AllWebinarsInscription implements Action {
  readonly type = Webinars.WebinarsInscriptionAll;
  constructor(public payload) {
  }
}

export class OrderWebinarNameUser {
  readonly type = OrderWebinar.NameUser;
  constructor(public payload) {
  }
}

export class OrderWebinarEmailUser {
  readonly type = OrderWebinar.EmailUser;
  constructor(public payload) {
  }
}

export class OrderWebinarPhoneUser {
  readonly type = OrderWebinar.PhoneUser;
  constructor(public payload) {
  }
}

export type InfoWebinars = AllWebinars
  | AllWebinarsInscription
  | OrderWebinarNameUser
  | OrderWebinarEmailUser
  | OrderWebinarPhoneUser;
