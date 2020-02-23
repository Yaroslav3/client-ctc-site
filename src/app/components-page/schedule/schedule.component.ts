import {AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
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
import {LoaderPageSpinnerComponent} from '../../global-components/loader/loader-page-spinner/loader-page-spinner.component';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {LoaderSmallSpinnerBtnComponent} from '../../global-components/loader/loader-small-spinner-btn/loader-small-spinner-btn.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  animations: [fadingAwayAnimate],
  providers: [LoaderPageSpinnerComponent, LoaderSmallSpinnerBtnComponent]
})
export class ScheduleComponent implements OnInit, AfterContentChecked {
  location: string;
  events: CalendarTrainings;
  options: OptionsInput;
  calendarPlugins = [dayGridPlugin];
  contentModalShow = false;
  dateEventCalendar = undefined;
  dataVisual;
  modelCalendarTrainingsDate = new CalendarTrainings();
  loader = false;
  loaderCalendarBtn = false;
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private route: Router,
              readonly viewportScroller: ViewportScroller,
              private headerControl: MainLayoutComponent,
              private getReduxData: GetReduxDataService,
              private loaderBtn: LoaderSmallSpinnerBtnComponent,
              private changeDetector: ChangeDetectorRef,
              private loaderPage: LoaderPageSpinnerComponent,
              private dateService: DateCalendarService) {
    this.location = 'schedule';
  }
  ngOnInit() {
    this.loader = true;
    this.loaderPage.startLoaderPageSpinner();
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    const firstDayOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth(), +1);
    const lastDayOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    this.getDateRequest(firstDayOfTheMonth, lastDayOfTheMonth);
    this.viewportScroller.scrollToPosition([0, 400]);
  }
  getDateRequest(start: Date, end: Date) {
    this.dateService.getRangeDataCalendar(this.transform(String(start.valueOf())),
      this.transform(String(end.valueOf()))).subscribe(response => {
      console.log(response);
      setTimeout(() => {
        const calendarApi = this.calendarComponent.getApi();
        this.dataVisual = calendarApi.view.title;
      });
      if (response) {
        this.dateEventCalendar = response;
        this.getAllDateCalendar(response);
        this.loaderPage.stopLoaderPageSpinner();
        this.loader = false;
      } else {
        this.dateEventCalendar = [];
        this.getAllDateCalendar(this.dateEventCalendar);
        this.loader = false;
      }
    });
  }
  transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd');
    return value;
  }
  // methods event button calendar
  nextCalendar() {
    this.startSpinnerCalendar();
    setTimeout(() => {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.next();
      if (calendarApi.state.viewType === 'dayGridMonth') {
        this.getDataCalendarMonth();
        this.loaderCalendarBtn = false;
        this.loaderBtn.stopSmallSpinnerBtn();
      }
      if (calendarApi.state.viewType === 'dayGridWeek') {
        this.getDataCalendarWeek();
        this.loaderCalendarBtn = false;
        this.loaderBtn.stopSmallSpinnerBtn();
      }
    }, 1000);
  }
  prevCalendar() {
    this.startSpinnerCalendar();
    setTimeout(() => {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.prev();
      if (calendarApi.state.viewType === 'dayGridMonth') {
        this.getDataCalendarMonth();
        this.closeSpinnerCalendar();
      }
      if (calendarApi.state.viewType === 'dayGridWeek') {
        this.getDataCalendarWeek();
        this.closeSpinnerCalendar();
      }
    }, 1000);
  }
  todayCalendar() {
    this.startSpinnerCalendar();
    setTimeout(() => {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.today();
      if (calendarApi.state.viewType === 'dayGridMonth') {
        this.getDataCalendarMonth();
        this.closeSpinnerCalendar();
      }
      if (calendarApi.state.viewType === 'dayGridWeek') {
        this.getDataCalendarWeek();
        this.closeSpinnerCalendar();
      }
    }, 500);
  }
  weekCalendar() {
    this.startSpinnerCalendar();
    setTimeout(() => {
      const status = 'dayGridWeek';
      const calendarApi = this.calendarComponent.getApi();
      console.log(calendarApi);
      calendarApi.state.viewType = status;
      calendarApi.getDate();
      calendarApi.next();
      calendarApi.prev();
      this.dataVisual = calendarApi.view.title;
      this.closeSpinnerCalendar();
    }, 500);
  }
  getAllDateCalendar(dateEventCalendar) {
    this.events = dateEventCalendar;
    this.options = {
      editable: true,
      eventLimit: false,
      timeZoneParam: 'Europe/Kiev',
      locale: 'RU',
      height: 600,
      themeSystem: 'standard',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      events: dateEventCalendar,
    };
  }
  startSpinnerCalendar() {
    this.loaderCalendarBtn = true;
    this.loaderBtn.startSmallSpinnerBtn();
  }
  closeSpinnerCalendar() {
    this.loaderCalendarBtn = false;
    this.loaderBtn.stopSmallSpinnerBtn();
  }
  getDataCalendarMonth() {
    const calendarApi = this.calendarComponent.getApi();
    const currentEnd = new Date(calendarApi.view.currentEnd.getFullYear(), calendarApi.view.currentEnd.getMonth(), 0);
    this.getDateRequest(calendarApi.view.currentStart, currentEnd);
    this.dataVisual = calendarApi.view.title;
  }
  getDataCalendarWeek() {
    const calendarApi = this.calendarComponent.getApi();
    this.getDateRequest(calendarApi.view.currentStart, calendarApi.view.currentEnd);
    this.dataVisual = calendarApi.view.title;
  }
  monthCalendar() {
    this.startSpinnerCalendar();
    setTimeout(() => {
      const status = 'dayGridMonth';
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.state.viewType = status;
      calendarApi.getDate();
      calendarApi.next();
      calendarApi.prev();
      this.dataVisual = calendarApi.view.title;
      this.closeSpinnerCalendar();
    }, 500);
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
    this.contentModalShow = true;
    this.hiddenScrollLine();
    this.modelCalendarTrainingsDate.start = model.event.start;
    this.modelCalendarTrainingsDate.end = model.event.end;
    this.modelCalendarTrainingsDate.title = model.event.title;
  }
  modalClose() {
    this.visualScrollLine();
    this.contentModalShow = false;
  }
  ngAfterContentChecked(): void {
  }
}

