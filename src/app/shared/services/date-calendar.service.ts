import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DateCalendarService {
  private readonly host: string;
  constructor(private http: HttpClient,
              private store: Store<AppState>) {
    this.host = environment.host;
  }
  getRangeDataCalendar(start: string, end: string) {
    console.log(typeof start, ':', start, '-', typeof end, ':', end);
    return this.http.get(`${this.host + environment.apiUrlGetAllDateCalendar}/${start}/${end}`);
  }
}
