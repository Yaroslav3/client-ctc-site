import {Action} from '@ngrx/store';

export enum LoadingTrainers {
  TrainersAll = 'TrainersAll',

}

export class AllTrainers implements Action {
  readonly type = LoadingTrainers.TrainersAll;

  constructor(public payload) {
  }

}
export type InfoTrainers = AllTrainers ;
