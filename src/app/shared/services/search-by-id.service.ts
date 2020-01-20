import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchByIdService {
  trainerId: number;
  constructor() {
  }
  getOrderTrainerId(id) {
    this.trainerId = id;
  }
  setOrderTrainerId() {
    return this.trainerId;
  }
}
