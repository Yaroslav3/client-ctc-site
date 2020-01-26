import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';
import {Trainers} from '../model/Trainers.model';
import {Inscriptions} from '../model/Inscriptions.model';
import {Webinars} from '../model/Webinars.model';
import {WebinarInscription} from '../model/WebinarInscription.model';

@Injectable({
  providedIn: 'root'
})
export class GetReduxDataService {
  selectedTrainers: Trainers;
  allTrainers;
  trainingsAll;
  inscriptions: Inscriptions;
  webinarsAll: Webinars;
  oneWebinar;
  webinarsInscription: WebinarInscription;
  constructor(private store: Store<AppState>) {
  }
  getOneTrainer(id) {
    this.store.select('stateTrainers', 'trainers').subscribe((allTrainer: Trainers) => {
      this.allTrainers = allTrainer;
      if (id) {
        this.selectedTrainers = this.allTrainers.find(t => t.id.toString() === id.toString());
      }
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
  getInscriptionsAll() {
    this.store.select('stateStartApplication', 'inscriptions').subscribe((inscriptionsAll: Inscriptions) => {
      this.inscriptions = inscriptionsAll;
    });
    return this.inscriptions;
  }
  getWebinars() {
    this.store.select('stateWebinars', 'webinars').subscribe((webinars: Webinars) => {
      this.webinarsAll = webinars;
    });
    return this.webinarsAll;
  }
  getOneWebinars(id: number) {
    this.store.select('stateWebinars', 'webinars').subscribe((webinars: Webinars) => {
      this.oneWebinar = webinars;
      this.oneWebinar = this.oneWebinar.find(w => w.id.toString() === id);
    });
    return this.oneWebinar;
  }
  getWebinarsInscription() {
    this.store.select('stateWebinars', 'webinarsInscription').subscribe((webinarsInscription: WebinarInscription) => {
      this.webinarsInscription = webinarsInscription;
    });
    return this.webinarsInscription;
  }
}


