import {Trainings} from './Trainings.model';

export class TrainingsShow {
  id: number;
  description: string;
  trainings: Trainings;
  constructor(id: number, description: string, trainings?: Trainings) {
    this.id = id;
    this.description = description;
    this.trainings = trainings;
  }
}
