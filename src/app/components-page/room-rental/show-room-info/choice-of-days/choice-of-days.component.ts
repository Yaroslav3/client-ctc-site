import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {fadingAwayAnimate, showAnimate} from '../../../../shared/animations/fading-away.animate';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {RoomDateService} from '../../../../shared/services/room-date.service';
import {DatePipe} from '@angular/common';
import {StatusMessage} from '../../../../shared/model/room/statusMessage.model';
import {RoomDatePeriod} from '../../../../shared/model/room/RoomDatePeriod.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../reduxe';
import {ChoiceOfDays} from '../../../../reduxe/room/room.actions';
import {LoaderSmallSpinnerBtnComponent} from '../../../../global-components/loader/loader-small-spinner-btn/loader-small-spinner-btn.component';
import * as moment from 'moment';

@Component({
  selector: 'app-choice-of-days',
  templateUrl: './choice-of-days.component.html',
  styleUrls: ['./choice-of-days.component.scss'],
  animations: [showAnimate, fadingAwayAnimate],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}, LoaderSmallSpinnerBtnComponent]
})
export class ChoiceOfDaysComponent implements OnInit, AfterContentChecked {
  dateStart: Date;
  visibleDataStart: Date;
  dateEnd: Date;
  visibleDataEnd: Date;
  errorStartData = false;
  errorEndData = false;
  disabledEndDate = true;
  btnNext = false;
  nextStartDeyValid = false;
  nextEndDeyValid = false;
  @Input() idRoom;
  wrongDateSelected: boolean;
  loaderComponent = false;
  constructor(private roomDate: RoomDateService,
              private route: Router,
              private config: NgbDatepickerConfig,
              private loader: LoaderSmallSpinnerBtnComponent,
              private store: Store<AppState>
  ) {
  }
  ngOnInit() {
    this.dataCorrectedCalendar();
  }
  ngAfterContentChecked(): void {
    this.btnVisible();
  }
  selectDataCalendarStart(startPeriod: Date) {
    const dataFormat = new Date(startPeriod);
    if (moment(dataFormat, 'YYYY-MM-DD', true).isValid()) {
      this.dataCorrectedCalendar(startPeriod);
      this.disabledEndDate = false;
      this.disabledEndDate = false;
      this.nextStartDeyValid = true;
      this.errorEndData = false;
      this.visibleDataStart = startPeriod;
      const start = new Date(startPeriod);
      start.setMinutes(0);
      start.setHours(0);
      const end = new Date(this.dateEnd ? this.dateEnd : startPeriod);
      end.setMinutes(59);
      end.setHours(23);
      if (start.valueOf() > end.valueOf()) {
        this.wrongDateSelected = true;
        this.errorStartData = false;
        this.errorEndData = false;
        this.nextStartDeyValid = false;
        return;
      } else {
        this.wrongDateSelected = false;
        this.periodStartDayRoom(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));
      }
    } else {
      this.errorStartData = false;
      this.btnNext = false;
      this.errorEndData = false;
      this.wrongDateSelected = false;
    }
  }
  periodStartDayRoom(start: string, end: string) {
    this.loader.startSmallSpinnerBtn();
    this.loaderComponent = true;
    this.roomDate.periodDayRoom(start, end, this.idRoom).subscribe((data: StatusMessage) => {
      // setTimeout(() => {
      if (data.message === 'not empty') {
        this.errorStartData = true;
        this.btnNext = false;
        this.disabledEndDate = false;
        this.errorEndData = false;
      } else {
        this.errorStartData = false;
      }
      this.dataCorrectedCalendar();
      this.visibleDataStart = new Date(start);
      this.loaderComponent = false;
      this.loader.stopSmallSpinnerBtn();
      // }, 1000);
    });
  }
  selectDataCalendarEnd(endPeriod: Date) {
    const dataFormat = new Date(endPeriod);
    if (moment(dataFormat, 'YYYY-MM-DD', true).isValid()) {
      this.dataCorrectedCalendar();
      this.visibleDataEnd = this.dateEnd;
      this.nextEndDeyValid = true;
      const start = new Date(this.dateStart);
      start.setMinutes(0);
      start.setHours(0);
      const end = new Date(endPeriod);
      end.setMinutes(59);
      end.setHours(23);
      if (start.valueOf() > end.valueOf()) {
        this.wrongDateSelected = true;
        this.errorStartData = false;
        this.errorEndData = false;
        this.nextEndDeyValid = false;
        return;
      } else {
        this.wrongDateSelected = false;
        this.periodEndDayRoom(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));
      }
    } else {
      this.nextEndDeyValid = false;
      this.btnNext = false;
    }
  }
  periodEndDayRoom(start: string, end: string) {
    this.loader.startSmallSpinnerBtn();
    this.loaderComponent = true;
    this.roomDate.periodDayRoom(start, end, this.idRoom).subscribe((data: StatusMessage) => {
      // setTimeout(() => {
      if (data.message === 'not empty') {
        this.errorEndData = true;
        this.btnNext = false;
        if (this.errorEndData) {
          this.errorStartData = false;
        }
      } else {
        this.errorEndData = false;
        this.errorStartData = false;
      }
      this.visibleDataEnd = new Date(end);
      this.loaderComponent = false;
      this.loader.stopSmallSpinnerBtn();
      // }, 2000);
    });
  }
  btnVisible() {
    if (!this.errorEndData && !this.errorStartData && this.visibleDataStart && this.visibleDataEnd &&
      !this.wrongDateSelected) {
      this.btnNext = true;
    } else {
      this.btnNext = false;
    }
    if (this.dateStart === null || this.dateEnd === null) {
      this.btnNext = false;
      this.errorEndData = false;
      this.errorStartData = false;
    }
    if (this.wrongDateSelected) {
      this.dataCorrectedCalendar();
    }
  }
  private transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd HH:mm');
    return value;
  }
  dataCorrectedCalendar(data?: Date) { // метод который деактивирует прошедшую дату
    const current = data ? data : new Date();
    console.log(current);
    this.config.minDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    this.config.outsideDays = 'hidden';
  }
  nextOnOrder() {
    if (this.btnNext) {
      const datePeriod = new RoomDatePeriod();
      datePeriod.startDate = this.visibleDataStart;
      datePeriod.endDate = this.visibleDataEnd;
      this.store.dispatch(new ChoiceOfDays(datePeriod));
      this.store.select('stateRoom', 'dataChoiceOfDays').subscribe(d => {
        console.log(d);
      });
      // this.transferDatePeriodService.setData(datePeriod);
      this.route.navigate(['room', 'order', this.idRoom]);
    }
  }
}
