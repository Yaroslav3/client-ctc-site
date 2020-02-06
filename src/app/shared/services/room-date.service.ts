import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomDateService {
  private readonly host: string;
  constructor(private http: HttpClient) {
    this.host = environment.host;
  }
  // get one room;
  getOneRoom(id: number) {
    return this.http.get<any>(`${this.host + environment.apiUrlRoomOne}/${id}`);
  }
  // get all time on one day
  timeOneDayRoom(startDay: string, endDay: string, id: number) {
    return this.http.get(`${this.host + environment.apiUrlRoomDayTimeOrder}/${startDay}/${endDay}/${id}`);
  }
  // Choice time on many day;
  periodDayRoom(startDay: string, endDay: string, id: number) {
    return this.http.get(`${this.host + environment.apiUrlRoomPeriodDayOrder}/${startDay}/${endDay}/${id}`);
  }
}
