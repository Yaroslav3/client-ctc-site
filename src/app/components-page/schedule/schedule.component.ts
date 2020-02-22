import {AfterContentChecked, Component, HostListener, OnChanges, OnInit, ViewChild} from '@angular/core';
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
import {DayGridSeg} from '@fullcalendar/daygrid/DayGrid';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  animations: [fadingAwayAnimate],
  providers: [LoaderPageSpinnerComponent]
})
export class ScheduleComponent implements OnInit, AfterContentChecked {
  location: string;
  events: CalendarTrainings;
  options: OptionsInput;
  counterMonth = 0;
  endOfTheMonth;
  counterDate;
  calendarPlugins = [dayGridPlugin];
  contentModalShow = false;
  dateEventCalendar;
  dataVisual;
  modelCalendarTrainingsDate = new CalendarTrainings();
  loader = false;
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private route: Router,
              readonly viewportScroller: ViewportScroller,
              private headerControl: MainLayoutComponent,
              private getReduxData: GetReduxDataService,
              private loaderPage: LoaderPageSpinnerComponent,
              private dateService: DateCalendarService) {
    this.location = 'schedule';
  }
  ngOnInit() {
    this.loader = true;
    this.loaderPage.startLoaderPageSpinner();
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    this.endOfTheMonth = new Date();
    const beginningOfTheMonth = new Date().setMonth(new Date().getMonth() - 1);
    // console.log(this.transform(String(this.endOfTheMonth.valueOf())));
    // console.log(this.transform(String(beginningOfTheMonth.valueOf())));
    // const beginningOfTheMonth = this.firstMonth.setMonth(this.firstMonth.getMonth() - 1);
    this.calculateData(beginningOfTheMonth, this.endOfTheMonth);
    this.viewportScroller.scrollToPosition([0, 400]);
  }
  calculateData(startDate: number, endData: number) {
    this.dateService.getRangeDataCalendar(this.transform(String(startDate.valueOf())), this.transform(String(endData.valueOf()))).subscribe(response => {
      if (response) {
        this.dateEventCalendar = response;
        this.getAllDateCalendar(response);
        this.dataVisualisations();
        this.loaderPage.stopLoaderPageSpinner();
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
    this.counterMonth++;
    const endOfTheMonth = new Date().setMonth(new Date().getMonth() + this.counterMonth);
    const beginningOfTheMonth = new Date(endOfTheMonth).setMonth(new Date(endOfTheMonth).getMonth() - 1);
    // console.log(this.transform(String(beginningOfTheMonth.valueOf())));
    // console.log(this.transform(String(endOfTheMonth.valueOf())));
    this.calculateData(beginningOfTheMonth, endOfTheMonth);
    setTimeout(() => {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.next();
      this.dataVisualisations();
    });
  }
  prevCalendar() {
    setTimeout(() => {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.prev();
      this.dataVisualisations();
    });
  }
  dataVisualisations() {
    setTimeout(() => {
      const calendarApi = this.calendarComponent.getApi();
      this.dataVisual = calendarApi.el.textContent.split('г.', 1) + 'г';
    });
  }
  todayCalendar() {
    setTimeout(() => {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.today();
      this.dataVisualisations();
    });
  }
  monthCalendar() {
    setTimeout(() => {
      const status = 'dayGridMonth';
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.state.viewType = status;
      calendarApi.getDate();
      calendarApi.next();
      calendarApi.prev();
      this.dataVisualisations();
    });
  }
  weekCalendar() {
    setTimeout(() => {
      const status = 'dayGridWeek';
      const calendarApi = this.calendarComponent.getApi();
      console.log(calendarApi);
      calendarApi.state.viewType = status;
      calendarApi.getDate();
      calendarApi.next();
      calendarApi.prev();
      // this.todayCalendar();
      this.dataVisualisations();
    });
  }
  getAllDateCalendar(dateEventCalendar) {
    this.events = this.dateEventCalendar;
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
    // this.someMethod();
    // this.dataVisualisations();
  }
}
