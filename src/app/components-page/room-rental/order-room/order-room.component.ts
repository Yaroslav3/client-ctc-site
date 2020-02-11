import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainLayoutComponent} from '../../../main-layout/main-layout.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetReduxDataService} from '../../../shared/services/get-redux-data.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reduxe';
import {ChoiceOfDays, HourlyOrder} from '../../../reduxe/room/room.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadingAwayAnimate, showAnimate} from '../../../shared/animations/fading-away.animate';
import * as moment from 'moment';

@Component({
  selector: 'app-order-room',
  templateUrl: './order-room.component.html',
  styleUrls: ['./order-room.component.scss'],
  animations: [showAnimate, fadingAwayAnimate],
})
export class OrderRoomComponent implements OnInit, OnDestroy {
  idRoom;
  room;
  date: Date;
  timeOrder;
  visualisationTimeOrder;
  visualisationDayOrder;
  dayOrder;
  isDateTimeRoom: boolean;
  isDateDayRoom: boolean;
  numOrder: number;
  countDay: number;
  formGroup: FormGroup;
  isSubmitted = false;
  constructor(private headerControl: MainLayoutComponent,
              private getReduxData: GetReduxDataService,
              private fb: FormBuilder,
              private store: Store<AppState>,
              private route: Router,
              private router: ActivatedRoute) {
    this.headerControl.hiddenHeaderComponent();
    this.isDateTimeRoom = false;
    this.isDateDayRoom = false;
  }
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.idRoom = params.id;
      this.room = this.getReduxData.getOneRoomState(this.idRoom);
      this.timeOrder = this.getReduxData.getOrderTimeState();
      this.dayOrder = this.getReduxData.getOrderDayState();
      this.createFormGroup();
      this.showBlockTimeOrder();
      this.showBlockDayOrder();
      if (!this.timeOrder && !this.dayOrder || !this.room) {
        this.route.navigate(['/room-rental']);
      }
    });
  }
  createFormGroup() {
    return this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }
  public get f() {
    return this.formGroup.controls;
  }
  showBlockTimeOrder() {
    if (this.timeOrder.length > 0) {
      this.isDateTimeRoom = true;
      this.visualisationTimeOrder = this.timeOrder;
      this.visualisationTimeOrder.sort((a, b) => {
        return a.startDate - b.startDate;
      });
      this.numOrder = this.timeOrder.length;
      this.date = this.timeOrder[0].startDate;
    } else {
      this.isDateTimeRoom = false;
    }
  }
  showBlockDayOrder() {
    if (Object.keys(this.dayOrder).length > 0) {
      this.isDateDayRoom = true;
      this.visualisationDayOrder = this.dayOrder;
      const start = moment(this.dayOrder.startDate);
      const end = moment(this.dayOrder.endDate);
      this.countDay = (end.diff(start, 'days') + 1);
    } else {
      this.isDateDayRoom = false;
    }
  }
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
    this.store.dispatch(new HourlyOrder({}));
    this.store.dispatch(new ChoiceOfDays({}));
    this.headerControl.menuScrolling = false;
  }
  createRoomPrice() {
    if (this.formGroup.invalid) {
      this.isSubmitted = true;
      return;
    }
  }
}
