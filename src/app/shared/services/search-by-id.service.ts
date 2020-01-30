import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchByIdService {
  trainerId: number;
  webinar: number;
  constructor() {
  }
  getOrderTrainerId(id: number) {
    this.trainerId = id;
  }
  setOrderTrainerId() {
    return this.trainerId;
  }
  getWebinarId(id: number) {
    this.webinar = id;
  }
  setWebinarId() {
    console.log(this.webinar);
    return this.webinar;
  }
}
