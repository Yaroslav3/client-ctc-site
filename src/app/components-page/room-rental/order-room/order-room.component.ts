import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainLayoutComponent} from '../../../main-layout/main-layout.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetReduxDataService} from '../../../shared/services/get-redux-data.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reduxe';
import {
  ChoiceOfDays,
  FormDescriptionsOrderRoom,
  FormEmailOrderRoom,
  FormNameOrderRoom,
  FormPhoneOrderRoom,
  HourlyOrder
} from '../../../reduxe/room/room.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadingAwayAnimate, showAnimate} from '../../../shared/animations/fading-away.animate';
import * as moment from 'moment';
import {RoomDateService} from '../../../shared/services/room-date.service';
import {StatusMessage} from '../../../shared/model/room/statusMessage.model';
import {OrderRoom} from '../../../shared/model/room/OrderRoom.model';

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
  formRedux;
  existTimePeriod = false;
  payment = false;
  constructor(private headerControl: MainLayoutComponent,
              private getReduxData: GetReduxDataService,
              private fb: FormBuilder,
              private store: Store<AppState>,
              private route: Router,
              private roomData: RoomDateService,
              private router: ActivatedRoute) {
    this.headerControl.hiddenHeaderComponent();
    this.isDateTimeRoom = false;
    this.isDateDayRoom = false;
  }
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.idRoom = params.id;
      this.formRedux = this.getReduxData.getFormOrderState();
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
  // ____________________form validators_________
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
  informationAboutOrder() {
    const order = new OrderRoom();
    order.nameSurname = this.f.name.value;
    order.email = this.f.email.value;
    order.phone = this.f.phone.value;
    order.currency = this.room.priseRoom[0].currency;
    order.description = this.f.description.value;
    order.roomRentalId = this.idRoom;
    order.nameRoom = this.room.nameRoom;
    return order;
  }
  // __________show temporary or daily room rental_____
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
  //
  // validation of the form for the accuracy of the entered data
  formValidation() {
    if (this.formGroup.invalid) {
      this.isSubmitted = true;
      return;
    } else {
      if (this.timeOrder.length > 0) {
        this.payment = true;
      }
      if (Object.keys(this.dayOrder).length > 0) {
      }
    }
  }
  //
  // check if time is taken in a given period
  checkTimeRoom() {
    let orderTime;
    for (let i = 0; i < this.timeOrder.length; i++) {
      orderTime = this.timeOrder.map(key => ({
        roomRentalId: this.idRoom,
        startDate: new Date(this.timeOrder[0].startDate + 'Z'),
        endDate: new Date(this.timeOrder[this.timeOrder.length - 1].endDate + 'Z')
      }));
    }
    this.roomData.checkedTimeRoom(orderTime, this.idRoom).subscribe((data: StatusMessage) => {
      if (data.message === 'no exist') {
        this.existTimePeriod = false;
        this.saveTimeOrderServer();
      } else if (data.message === 'exist') {
        this.existTimePeriod = true;
      }
    });
  }
  //
  // create order room time by one day;
  private saveTimeOrderServer() {
    const order = this.informationAboutOrder();
    order.price = this.room.priseRoom[0].priceHour * this.timeOrder.length;
    order.startTime = new Date(this.timeOrder[0].startDate + 'Z');
    order.endTime = new Date((this.timeOrder[this.timeOrder.length - 1].endDate + 'Z'));
    console.log(order);
    this.roomData.createOrderRoom(order).subscribe((date: OrderRoom) => {
      console.log(date);
      // if (date !== null) {
      //   for (let i = 0; i < Object.keys(this.arrayOrder).length; i++) {
      //     this.orderTime = Object.keys(this.arrayOrder).map(key =>
      //       ({
      //         roomRentalId: this.id,
      //         orderRoomId: date.id,
      //         startDate: new Date(this.arrayOrder[key].startDate + 'Z'),
      //         endDate: new Date(this.arrayOrder[key].endDate + 'Z')
      //       }));
      //   }
      //   console.log(this.orderTime);
      //   this.roomDateService.createTimeOrderRoom(this.orderTime).subscribe(data => {
      //     console.log(data);
      //   });
      // }
    });
  }
  liqPayInvoiceRoom() {
  }
  // ____form filling methods from state___
  nameRedux() {
    if (this.formGroup.controls.name.valid) {
      this.store.dispatch(new FormNameOrderRoom(this.formGroup.controls.name.value));
    }
  }
  emailRedux() {
    if (this.formGroup.controls.email.valid) {
      this.store.dispatch(new FormEmailOrderRoom(this.formGroup.controls.email.value));
    }
  }
  phoneRedux() {
    if (this.formGroup.controls.phone.valid) {
      this.store.dispatch(new FormPhoneOrderRoom(this.formGroup.controls.phone.value));
    }
  }
  descriptionRedux() {
    if (this.formGroup.controls.description.valid) {
      this.store.dispatch(new FormDescriptionsOrderRoom(this.formGroup.controls.description.value));
    }
  }
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
    this.store.dispatch(new HourlyOrder({}));
    this.store.dispatch(new ChoiceOfDays({}));
    this.headerControl.menuScrolling = false;
  }
  backToForm() {
    this.payment = false;
    this.formRedux = this.getReduxData.getFormOrderState();
  }
}
