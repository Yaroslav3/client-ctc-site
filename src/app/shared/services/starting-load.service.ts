import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {eHomePhoto, environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';
import {User} from '../model/User.model';
import {AddPhoto, InfoFooter, InscriptionsAll} from '../../reduxe/startApplication/startApplication.actions';
import {AllTrainers} from '../../reduxe/trainers/trainers.actions';
import {Trainings} from '../model/Trainings.model';
import {AllTrainings} from '../../reduxe/trainings/trainings.action';
import {Inscriptions} from '../model/Inscriptions.model';
import {Webinars} from '../model/Webinars.model';
import {AllWebinars, AllWebinarsInscription} from '../../reduxe/vebinars/webinars.action';
import {WebinarInscription} from '../model/WebinarInscription.model';

@Injectable({
  providedIn: 'root'
})
export class StartingLoadService {
  private readonly host: string;
  constructor(private http: HttpClient,
              private store: Store<AppState>) {
    this.host = environment.host;
  }
  getPhotoStartPageGetAll() {
    return this.http.get(`${this.host + eHomePhoto.apiUrlPhotoPageStartGetAll}`)
      .subscribe(data => {
        this.store.dispatch(new AddPhoto(data));
      });
  }
  getFooterInfo() {
    return this.http.get(this.host + environment.apiUrlUser)
      .subscribe((dataFooter: User) => {
        this.store.dispatch(new InfoFooter(dataFooter));
      });
  }
  getAllTrainers() {
    this.http.get(this.host + environment.apiUrlTrainers).subscribe
    ((trainers) => {
      this.store.dispatch(new AllTrainers(trainers));
    });
  }
  getAllTrainings() {
    return this.http.get(this.host + environment.apiUrlTrainings)
      .subscribe((allTrainings: Trainings) => {
        this.store.dispatch(new AllTrainings(allTrainings));
      });
  }
  getAllInscriptions() {
    return this.http.get(this.host + environment.apiUrlTrainingsInscriptions)
      .subscribe((allInscriptions: Inscriptions) => {
        this.store.dispatch(new InscriptionsAll(allInscriptions));
      });
  }
  getOneTrainings(id: number) {
    return this.http.get(`${this.host + environment.apiUrlTrainingsGetOne}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getSkillTrainerOneTrainer(id) {
    return this.http.get(`${this.host + environment.apiUrlGetAllNameSkills}/${id}`);
  }
  getWebinars() {
    return this.http.get(this.host + environment.apiUrlWebinars)
      .subscribe((webinars: Webinars) => {
        this.store.dispatch(new AllWebinars(webinars));
      });
  }
  getWebinarsInscription() {
    return this.http.get(this.host + environment.apiUrlWebinarsInscription)
      .subscribe((webinarsInscription: WebinarInscription) => {
        this.store.dispatch(new AllWebinarsInscription(webinarsInscription));
      });
  }
}
