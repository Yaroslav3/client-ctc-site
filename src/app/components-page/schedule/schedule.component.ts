import {AfterContentChecked, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {CalendarTrainings} from '../../shared/model/CalendarTrainings.model';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import {OptionsInput, preventDefault} from '@fullcalendar/core';
import {MainLayoutComponent} from '../../main-layout/main-layout.component';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {Router} from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  animations: [fadingAwayAnimate]
})
export class ScheduleComponent implements OnInit, AfterContentChecked, OnDestroy {
  location: string;
  events: CalendarTrainings;
  options: OptionsInput;
  contentModelShow = false;
  dateEventCalendar;
  modelCalendarTrainingsDate = new CalendarTrainings();
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private route: Router,
              private headerControl: MainLayoutComponent,
              private getReduxData: GetReduxDataService) {
    this.location = 'schedule';
  }
  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    this.dateEventCalendar = this.getReduxData.getAllDateCalendarState();
    this.getAllDateCalendar();
  }
  ngAfterContentChecked(): void {
  }
  getAllDateCalendar() {
    this.dateEventCalendar = this.getReduxData.getAllDateCalendarState();
    this.events = this.dateEventCalendar;
    this.options = {
      plugins: [dayGridPlugin],
      editable: true,
      eventLimit: false,
      timeZoneParam: 'Europe/Kiev',
      locale: 'RU',
      height: 750,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, dayGridDay'
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
      events: this.dateEventCalendar,
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
  ngOnDestroy(): void {
    // this.headerControl.menuScrolling = false;
  }
  modalClose() {
    this.visualScrollLine();
    this.contentModelShow = false;
  }
}
