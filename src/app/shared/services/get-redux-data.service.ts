import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';
import {Trainers} from '../model/Trainers.model';
import {Inscriptions} from '../model/Inscriptions.model';
import {Webinars} from '../model/Webinars.model';
import {WebinarInscription} from '../model/WebinarInscription.model';
import {WebinarOrderForm} from '../model/WebinarOrderForm.model';
import {CalendarTrainings} from '../model/CalendarTrainings.model';
import {Room} from '../model/Room.model';
import {date} from '@rxweb/reactive-form-validators';
import {RoomOrderForm} from '../model/room/RoomOrderForm.model';

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
  allDateCalendar: CalendarTrainings;
  allRoom: Room;
  oneRoom;
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
  getTrainingFormState() {
    let traingsUserForm = {};
    this.store.select('stateTrainings', 'trainingOrder').subscribe(order => {
      traingsUserForm = order;
    });
    return traingsUserForm;
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
  getWebinarFormState() {
    let formWebinarUser = {};
    this.store.select('stateWebinars', 'orderWebinarForm').subscribe((order: WebinarOrderForm) => {
      formWebinarUser = order;
    });
    return formWebinarUser;
  }
  getWebinarsInscription() {
    this.store.select('stateWebinars', 'webinarsInscription').subscribe((webinarsInscription: WebinarInscription) => {
      this.webinarsInscription = webinarsInscription;
    });
    return this.webinarsInscription;
  }
  getAllDateCalendarState() {
    this.store.select('stateStartApplication', 'dataCalendar').subscribe(dateCalendar => {
      this.allDateCalendar = dateCalendar;
    });
    return this.allDateCalendar;
  }
  getAllRoomState() {
    this.store.select('stateRoom', 'roomRental').subscribe(allRoom => {
      this.allRoom = allRoom;
    });
    return this.allRoom;
  }
  getOneRoomState(id: number) {
    this.oneRoom = this.getAllRoomState();
    this.oneRoom = this.oneRoom.find(r => r.id.toString() === id);
    return this.oneRoom;
  }
  getOrderTimeState() {
    let orderTime = {};
    this.store.select('stateRoom', 'dataHourlyOrder').subscribe(data => {
      orderTime = data;
    });
    return orderTime;
  }
  getOrderDayState() {
    let orderDay = {};
    this.store.select('stateRoom', 'dataChoiceOfDays').subscribe(dateOrderDay => {
      orderDay = dateOrderDay;
    });
    return orderDay;
  }
  getFormOrderState() {
    let formOrderRoom = {};
    this.store.select('stateRoom', 'orderFormRoom').subscribe((dateFormOrderRoom: RoomOrderForm) => {
      formOrderRoom = dateFormOrderRoom;
    });
    return formOrderRoom;
  }
}


