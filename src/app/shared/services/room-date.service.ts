import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OrderRoom} from '../model/room/OrderRoom.model';
import {Room} from '../model/Room.model';
import {AllRoomData} from '../../reduxe/room/room.actions';
import {AppState} from '../../reduxe';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RoomDateService {
  private readonly host: string;
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.host = environment.host;
  }
  getAllRoom() {
    return this.http.get<any>(this.host + environment.apiUrlRoomAll).subscribe((allRoom: Room) => {
      this.store.dispatch(new AllRoomData(allRoom));
    });
  }
  // get all time on one day
  timeOneDayRoom(startDay: string, endDay: string, id: number) {
    return this.http.get(`${this.host + environment.apiUrlRoomDayTimeOrder}/${startDay}/${endDay}/${id}`);
  }
  // Choice time on many day;
  periodDayRoom(startDay: string, endDay: string, id: number) {
    return this.http.get(`${this.host + environment.apiUrlRoomPeriodDayOrder}/${startDay}/${endDay}/${id}`);
  }
  // check time is busy or not
  checkedTimeRoom(roomTime = [], id: number) {
    return this.http.post(`${this.host + environment.apiUrlCheckedTimeRoom}/${id}`, roomTime, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // create order room rental;
  createOrderRoom(orderRoom: OrderRoom) {
    return this.http.post(`${this.host + environment.apiUrlCreateRoomOrder}/`, orderRoom, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // save time order;
  createTimeOrderRoom(roomTime = []) {
    return this.http.post(`${this.host + environment.apiUrlSaveTimeRoom}`, roomTime, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
