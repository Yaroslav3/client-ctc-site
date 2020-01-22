import {Action} from 'redux';

export enum Webinars {
  WebinarsAll = 'WebinarsAll',
  WebinarsInscriptionAll = 'WebinarsInscriptionAll'
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

export type InfoWebinars = AllWebinars | AllWebinarsInscription;
