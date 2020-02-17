import {Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {RoomDateService} from '../../../../shared/services/room-date.service';
import {RoomTimeOrder} from '../../../../shared/model/RoomTimeOrder.model';
import {DatePipe} from '@angular/common';
import {fadingAwayAnimate, showAnimate} from '../../../../shared/animations/fading-away.animate';
import {Router} from '@angular/router';
import {LoaderSmallSpinnerBtnComponent} from '../../../../global-components/loader/loader-small-spinner-btn/loader-small-spinner-btn.component';
import {AppState} from '../../../../reduxe';
import {HourlyOrder} from '../../../../reduxe/room/room.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-hourly-selection',
  templateUrl: './hourly-selection.component.html',
  styleUrls: ['./hourly-selection.component.scss'],
  animations: [showAnimate, fadingAwayAnimate],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}, LoaderSmallSpinnerBtnComponent]
})
export class HourlySelectionComponent implements OnInit {
  date: Date;
  dateError: boolean;
  arrayTime = [];
  datePicker: boolean;
  selectedData: boolean;
  selectedTime: boolean;
  timeCheckbox: any = [];
  loaderTimePeriod: boolean;
  @Input() idRoom;
  @ViewChildren('input') public inputs: ElementRef<HTMLInputElement>[];
  timeChoice = [
    {time: '10:00 - 11:00', status: false},
    {time: '11:00 - 12:00', status: false},
    {time: '12:00 - 13:00', status: false},
    {time: '13:00 - 14:00', status: false},
    {time: '14:00 - 15:00', status: false},
    {time: '15:00 - 16:00', status: false},
    {time: '16:00 - 17:00', status: false},
    {time: '17:00 - 18:00', status: false},
    {time: '18:00 - 19:00', status: false}
  ];
  constructor(private roomDate: RoomDateService,
              private loader: LoaderSmallSpinnerBtnComponent,
              private config: NgbDatepickerConfig,
              private store: Store<AppState>,
              private route: Router) {
  }
  ngOnInit() {
    this.getAllTimeDay();
    this.dataCorrectedCalendar();
  }
  // get all time day
  private getAllTimeDay() {
    // переопределяем массив объектов (списка времени) в другой формат
    this.timeCheckbox = Object.keys(this.timeChoice).map(key =>
      ({time: key, number: key, value: this.timeChoice[key]}));
  }
  selectDataCalendar(startPeriod: Date) {
    this.selectedData = false;
    this.datePicker = false;
    this.selectedTime = false;
    if (startPeriod === null) {
      this.dateError = false;
      return;
    } else {
      if (typeof startPeriod === 'object') {
        this.dateError = false;
        const end = new Date(startPeriod);
        const start = new Date(this.date);
        end.setDate(start.getDate());
        start.setHours(10);
        start.setMinutes(0);
        end.setHours(20);
        end.setMinutes(0);
        this.dateTime(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));
        this.inputs.forEach(check => {
          check.nativeElement.checked = false;
        });
        this.arrayTime = []; // при выборе даты очищаем массив с выбранным временем
      } else {
        this.dateError = true;
      }
    }
  }
  dataCorrectedCalendar() { // метод который деактивирует прошедшую дату
    const current = new Date();
    this.config.minDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    this.config.outsideDays = 'hidden';
  }
  dateTime(start: string, end: string) {
    this.loaderTimePeriod = true;
    this.loader.startSmallSpinnerBtn();
    this.roomDate.timeOneDayRoom(start, end, this.idRoom).subscribe((data: RoomTimeOrder) => {
      setTimeout(() => {
        if (!data) {
        } else {
          this.showTimeOrder(data);
          this.loaderTimePeriod = false;
          this.loader.stopSmallSpinnerBtn();
        }
      }, 1000);
    });
  }
  private showTimeOrder(data: RoomTimeOrder) {
    // при поступлении данных переводим все значения чекбоксов в положение false при любых раскладах
    for (let b = 0; b < Object.keys(this.timeChoice).length; b++) {
      this.timeChoice[b].status = false;
    }
    for (let i = 0; i < Object.keys(data).length; i++) {
      for (let b = 0; b < Object.keys(this.timeChoice).length; b++) {
        if (this.transformTime(data[i].startDate) +
          ' - ' + this.transformTime(data[i].endDate) === this.timeChoice[b].time) {
          this.timeChoice[b].status = true;
        }
      }
    }
  }
  onChange(time: string, isChecked: boolean) {
    this.selectedTime = false;
    if (this.date) {
      const roomTimeOrder = new RoomTimeOrder();
      const numberEnd = time.lastIndexOf('-');
      const end = numberEnd + 2;
      const num: any = time.substring(end).replace(/[0/: /-]/g, '');
      if (isChecked === true) {
        // start time;
        roomTimeOrder.startDate = this.createNumberData(Number(num - 1));
        // end time;
        roomTimeOrder.endDate = this.createNumberData(Number(num));
        this.arrayTime.push(roomTimeOrder);
      } else {
        for (let i = 0; i < this.arrayTime.length; i++) {
          if (new Date(this.arrayTime[i].startDate).getHours() === this.createNumberData(Number(num - 1)).getHours()) {
            this.arrayTime.splice(i, 1);
          }
        }
      }
    } else {
      this.datePicker = true;
    }
  }
  private createNumberData(endNumber: number) {
    const datePipe = new DatePipe('en-US');
    this.date.setHours(endNumber);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    const s = datePipe.transform(this.date, 'short');
    return new Date(s);
  }
  private transformTime(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'HH:mm');
    return value;
  }
  private transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd HH:mm');
    return value;
  }
  nextOnOrder() {
    if (!this.date) {
      this.selectedData = true;
    } else if (this.arrayTime.length === 0) {
      this.selectedTime = true;
    } else {
      this.store.dispatch(new HourlyOrder(this.arrayTime));
      this.route.navigate(['room', 'order', this.idRoom]);
    }
  }
}
