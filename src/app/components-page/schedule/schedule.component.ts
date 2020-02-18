import {AfterContentChecked, Component, HostListener, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {CalendarTrainings} from '../../shared/model/CalendarTrainings.model';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import {OptionsInput} from '@fullcalendar/core';
import {MainLayoutComponent} from '../../main-layout/main-layout.component';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {Router} from '@angular/router';
import {DatePipe, ViewportScroller} from '@angular/common';
import {DateCalendarService} from '../../shared/services/date-calendar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  animations: [fadingAwayAnimate]
})
export class ScheduleComponent implements OnInit, AfterContentChecked, OnChanges {
  location: string;
  events: CalendarTrainings;
  options: OptionsInput;
  contentModelShow = false;
  dateEventCalendar;
  modelCalendarTrainingsDate = new CalendarTrainings();
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private route: Router,
              readonly viewportScroller: ViewportScroller,
              private headerControl: MainLayoutComponent,
              private getReduxData: GetReduxDataService,
              private dateService: DateCalendarService) {
    this.location = 'schedule';
  }
  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    const st = new Date();
    st.setMonth(st.getMonth() - 1);
    this.dateService.getRangeDataCalendar(this.transform(String(st.valueOf())), this.transform(String(new Date().valueOf()))).subscribe(d => {
      this.dateEventCalendar = d;
      this.getAllDateCalendar(d);
      console.log('test', this.dateEventCalendar);
      if (Object.keys(this.dateEventCalendar).length === 0) {
        this.route.navigate(['/home']);
      }
    });
    this.viewportScroller.scrollToPosition([0, 400]);
  }
  private transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd');
    return value;
  }
  ngOnChanges(): void {
  }
  ngAfterContentChecked(): void {
  }
  getAllDateCalendar(dateEventCalendar) {
    this.events = this.dateEventCalendar;
    this.options = {
      plugins: [dayGridPlugin],
      editable: true,
      eventLimit: false,
      timeZoneParam: 'Europe/Kiev',
      locale: 'RU',
      height: 600,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, dayGridDay, list'
      },
      buttonText: {
        today: 'Сегодня',
        month: 'Месяц',
        week: 'Неделя',
        day: 'День'
      },
      themeSystem: 'standard',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      events: dateEventCalendar,
    };
  }
  @HostListener('window:mouseenter')
  hiddenScrollLine() {
    const w = document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.width = w + 'px';
  }
  @HostListener('window:mouseleave')
  visualScrollLine() {
    setTimeout(() => {
      document.body.style.overflow = 'initial';
      document.body.style.width = 'auto';
    }, 500);
  }
  eventClick(model) {
    this.contentModelShow = true;
    this.hiddenScrollLine();
    this.modelCalendarTrainingsDate.start = model.event.start;
    this.modelCalendarTrainingsDate.end = model.event.end;
    this.modelCalendarTrainingsDate.title = model.event.title;
  }
  modalClose() {
    this.visualScrollLine();
    this.contentModelShow = false;
  }
}
