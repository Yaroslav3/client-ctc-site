import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../model/Order.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }

  saveOrder(order: Order) {
    return this.http.post(this.host + environment.apiUrlTrainingsOrder, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
