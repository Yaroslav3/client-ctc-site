import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchByIdService {
  trainerId: number;
  webinar: number;
  numberOfUserOrders;
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
  getNumberOfParticipantsInTheOrder(count: number) {
    this.numberOfUserOrders = count;
  }
  setNumberOfParticipantsInTheOrder() {
    return this.numberOfUserOrders;
  }
}
