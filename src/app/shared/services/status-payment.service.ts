import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';

@Injectable({
  providedIn: 'root'
})
export class StatusPaymentService {
  private readonly host: string;
  constructor(private http: HttpClient) {
    this.host = environment.host;
  }
  // status order LiqPay
  statusLiqPay(id: number) {
    return this.http.get(`${this.host + environment.apiUrlWebinarOrderStatus}/${id}`);
  }
}
