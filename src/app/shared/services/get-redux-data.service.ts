import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';
import {Trainers} from '../model/Trainers.model';
import {Inscriptions} from '../model/Inscriptions.model';

@Injectable({
  providedIn: 'root'
})
export class GetReduxDataService {
  selectedTrainers: Trainers;
  allTrainers;
  trainingsAll;
  inscriptions: Inscriptions;
  constructor(private store: Store<AppState>) {
  }
  getOneTrainer(id) {
    this.store.select('stateTrainers', 'trainers').subscribe((allTrainer: Trainers) => {
      this.allTrainers = allTrainer;
      this.selectedTrainers = this.allTrainers.find(t => t.id.toString() === id);
    });
    return this.selectedTrainers;
  }
  getTrainers() {
    let allTrainers = {};
    this.store.select('stateTrainers', 'trainers').subscribe((trainers) => {
      allTrainers = Object.keys(trainers).map(key => ({trainers: key, value: trainers[key]}));
    });
    return allTrainers;
  }
  getAllTrainer() {
    this.store.select('stateTrainers', 'trainers').subscribe((trainers) => {
      this.allTrainers = trainers;
    });
    return this.allTrainers;
  }
  getTrainingsAll() {
    this.store.select('stateTrainings', 'trainings').subscribe((allTrainings) => {
      this.trainingsAll = allTrainings;
    });
    return this.trainingsAll;
  }
  getOneTraining(id) {
    const trainingsAll = this.getTrainingsAll();
    const oneTraining = trainingsAll.find(t => t.id.toString() === id.toString());
    return oneTraining;
  }
  getOneTrainingsSkills(id) {
    const allTrainer = this.getAllTrainer();
    console.log(allTrainer);
  }
  getInscriptionsAll() {
    this.store.select('stateStartApplication', 'inscriptions').subscribe((inscriptionsAll: Inscriptions) => {
      this.inscriptions = inscriptionsAll;
    });
    return this.inscriptions;
  }
}


