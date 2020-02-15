import {Trainings} from './Trainings.model';

export class TrainingsShow {
  id: number;
  description: string;
  pdf: boolean;
  trainings: Trainings;
  constructor(id: number, description: string, pdf: boolean, trainings?: Trainings) {
    this.id = id;
    this.description = description;
    this.pdf = pdf;
    this.trainings = trainings;
  }
}
