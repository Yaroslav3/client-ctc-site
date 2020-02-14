import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {fadingAwayAnimate, showAnimate} from '../../../../shared/animations/fading-away.animate';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
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
  errorInvalidStartDay = false;
  errorInvalidEndDay = false;
  disabledEndDate = true;
  btnNext = false;
  nextStartDeyValid = false;
  nextEndDeyValid = false;
  @Input() idRoom;
  wrongDateSelected: boolean;
  loaderComponent = false;
  constructor(private roomDate: RoomDateService,
              private route: Router,
              private loader: LoaderSmallSpinnerBtnComponent,
              private store: Store<AppState>
  ) {
  }
  ngOnInit() {
  }
  ngAfterContentChecked(): void {
    this.btnVisible();
  }
  selectDataCalendarStart(startPeriod: Date) {
    console.log(startPeriod);
    if (startPeriod === null) {
      this.errorInvalidStartDay = false;
      this.errorEndData = false;
      this.errorStartData = false;
      this.btnNext = false;
      return;
    } else {
      const dataFormat = new Date(startPeriod);
      if (moment(dataFormat, 'YYYY-MM-DD', true).isValid()) {
        this.disabledEndDate = false;
        this.disabledEndDate = false;
        this.nextStartDeyValid = true;
        this.errorEndData = false;
        this.visibleDataStart = startPeriod;
        this.errorInvalidStartDay = false;
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
        this.errorInvalidStartDay = true;
        this.btnNext = false;
        this.errorEndData = false;
        this.wrongDateSelected = false;
      }
    }
  }
  periodStartDayRoom(start: string, end: string) {
    this.loader.startSmallSpinnerBtn();
    this.loaderComponent = true;
    this.roomDate.periodDayRoom(start, end, this.idRoom).subscribe((data: StatusMessage) => {
      setTimeout(() => {
        if (data.message === 'not empty') {
          this.errorStartData = true;
          this.btnNext = false;
          this.disabledEndDate = false;
          if (this.errorStartData) {
            this.errorEndData = false;
          }
        } else {
          this.errorStartData = false;
        }
        this.visibleDataStart = new Date(start);
        this.loaderComponent = false;
        this.loader.stopSmallSpinnerBtn();
      }, 1000);
    });
  }
  selectDataCalendarEnd(endPeriod: Date) {
    if (endPeriod === null) {
      this.errorInvalidEndDay = false;
      this.errorStartData = false;
      this.errorEndData = false;
      this.btnNext = false;
      return;
    } else {
      const dataFormat = new Date(endPeriod);
      if (moment(dataFormat, 'YYYY-MM-DD', true).isValid()) {
        this.errorInvalidEndDay = false;
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
        this.errorInvalidEndDay = true;
        this.btnNext = false;
        if (this.errorInvalidEndDay) {
          this.errorEndData = false;
          this.wrongDateSelected = false;
          this.errorStartData = false;
          this.nextStartDeyValid = false;
        }
      }
    }
  }
  periodEndDayRoom(start: string, end: string) {
    this.loader.startSmallSpinnerBtn();
    this.loaderComponent = true;
    this.roomDate.periodDayRoom(start, end, this.idRoom).subscribe((data: StatusMessage) => {
      setTimeout(() => {
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
      }, 2000);
    });
  }
  btnVisible() {
    if (!this.errorEndData && !this.errorStartData && this.visibleDataStart && this.visibleDataEnd &&
      !this.wrongDateSelected && !this.errorInvalidStartDay && !this.errorInvalidEndDay) {
      this.btnNext = true;
    } else {
      this.btnNext = false;
    }
    if (this.dateStart === null || this.dateEnd === null) {
      this.btnNext = false;
      this.errorEndData = false;
      this.errorStartData = false;
    }
    if (this.errorInvalidEndDay || this.errorInvalidStartDay) {
      this.errorStartData = false;
      this.errorEndData = false;
      this.btnNext = false;
    }
  }
  private transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd HH:mm');
    return value;
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
