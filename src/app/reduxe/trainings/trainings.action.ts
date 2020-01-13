import {Action} from 'redux';

export enum Trainings {
  TrainingsAll = 'TrainingsAll',

}

export class AllTrainings implements Action {
  readonly type = Trainings.TrainingsAll;

  constructor(public payload) {
  }

}

export type InfoTrainings = AllTrainings;
