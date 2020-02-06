import {Component, Input, OnInit} from '@angular/core';
import {fadingAwayAnimate, showAnimate} from '../../../../shared/animations/fading-away.animate';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {RoomDateService} from '../../../../shared/services/room-date.service';
import {DatePipe} from '@angular/common';
import {StatusMessage} from '../../../../shared/model/room/statusMessage.model';

@Component({
  selector: 'app-choice-of-days',
  templateUrl: './choice-of-days.component.html',
  styleUrls: ['./choice-of-days.component.scss'],
  animations: [showAnimate, fadingAwayAnimate],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ChoiceOfDaysComponent implements OnInit {
  dateStart: Date;
  dateEnd: Date;
  selectedStartDay: Date;
  errorStartData = false;
  selectedEndDay: Date;
  errorEndData = false;
  disabledStartDate = true;
  @Input() idRoom;
  dateError: boolean;
  constructor(private roomDate: RoomDateService) {
  }
  ngOnInit() {
  }
  selectDataCalendarStart(startPeriod: Date) {
    if (typeof startPeriod === 'object') {
      this.disabledStartDate = false;
      this.errorStartData = true;
      this.selectedStartDay = new Date(startPeriod);
      this.selectedStartDay.setDate(this.dateStart.getDate() + 1);
      const start = new Date(startPeriod);
      start.setMinutes(0);
      start.setHours(0);
      const end = new Date(startPeriod);
      end.setMinutes(59);
      end.setHours(23);
      this.periodStartDayRoom(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));
    }
  }
  selectDataCalendarEnd(endPeriod: Date) {
    const start = new Date(this.dateStart);
    start.setMinutes(0);
    start.setHours(0);
    const end = new Date(endPeriod);
    end.setMinutes(59);
    end.setHours(23);
    this.periodEndDayRoom(this.transform(String(start.valueOf())), this.transform(String(end.valueOf())));
  }
  periodStartDayRoom(start: string, end: string) {
    this.roomDate.periodDayRoom(start, end, this.idRoom).subscribe((data: StatusMessage) => {
      if (data.message === 'not empty') {
        this.errorStartData = true;
        this.disabledStartDate = true;
        this.dateEnd = null;
      } else {
        this.errorStartData = false;
        this.disabledStartDate = false;
      }
    });
  }
  periodEndDayRoom(start: string, end: string) {
    this.roomDate.periodDayRoom(start, end, this.idRoom).subscribe((data: StatusMessage) => {
      if (data.message === 'not empty') {
        this.errorEndData = true;
      } else {
        this.errorEndData = false;
      }
      console.log(data);
    });
  }
  private transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd HH:mm');
    return value;
  }
}
