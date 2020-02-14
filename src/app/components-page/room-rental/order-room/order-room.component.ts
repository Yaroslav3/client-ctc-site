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
  translateDaysToTime = new Map<Date, Date>(); // переменная которая хранит значения перевода дний во время.
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
  backToForm() {
    this.payment = false;
    this.formRedux = this.getReduxData.getFormOrderState();
  }
  // ____________________form validators_________
  createFormGroup() {
    return this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(14), Validators.minLength(14)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }
  public get f() {
    return this.formGroup.controls;
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
  informationAboutOrder() {
    const order = new OrderRoom();
    order.nameSurname = this.f.name.value;
    order.email = this.f.email.value;
    order.phone = Number(this.f.phone.value.replace(/[- ()]/g, ''));
    order.currency = this.room.priseRoom[0].currency;
    order.description = this.f.description.value;
    order.roomRentalId = +this.idRoom;
    order.nameRoom = this.room.nameRoom;
    return order;
  }
  // _______________________validation of the form for the accuracy of the entered data_________________________
  formValidation() {
    if (this.formGroup.invalid) {
      this.isSubmitted = true;
      return;
    } else {
      if (this.timeOrder.length > 0) {
        this.payment = true;
      }
      if (Object.keys(this.dayOrder).length > 0) {
        this.payment = true;
      }
    }
  }
  // ________________методлы для оформления заказа по часовому  или длительному периоду ______________________
  checkRoom() {
    if (this.timeOrder.length > 0) { // почасовой период
      this.checkTimeRoom();
    }
    if (Object.keys(this.dayOrder).length > 0) { // длительный период
      this.checkTimeDayRoom();
    }
  }
  // _____________почасовой период________
  checkTimeRoom() {
    let orderTime;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.timeOrder.length; i++) {
      orderTime = this.timeOrder.map(key => ({
        roomRentalId: this.idRoom,
        startDate: new Date(this.timeOrder[0].startDate + 'Z'),
        endDate: new Date(this.timeOrder[this.timeOrder.length - 1].endDate + 'Z')
      }));
    }
    this.roomData.checkedTimeRoom(orderTime, this.idRoom).subscribe((data: StatusMessage) => {
      if (data.message === 'no exist') {
        // добавляем необходимые данные по заказу для блока почасового выбора времени
        const order = this.informationAboutOrder();
        order.price = this.room.priseRoom[0].priceHour * this.timeOrder.length;
        order.startTime = new Date(this.timeOrder[0].startDate + 'Z');
        order.endTime = new Date((this.timeOrder[this.timeOrder.length - 1].endDate + 'Z'));
        order.createOrderTime = new Date();
        this.existTimePeriod = false;
        // вызываем метод для перенаправля юзера на оплату и результат записываем в переменную.
        const statusPayment = this.liqPayInvoiceRoom(order);
        if (statusPayment) { // если оплата успешная то закрываем за юзером выбранное время
          this.saveTimeOrderServer(order);
        } else { // если нет то выводим сообщение о ошибке
          console.log('ошибка по оплате');
        }
      } else if (data.message === 'exist') {
        this.existTimePeriod = true;
        this.payment = false;
      }
    });
  }
  //
  // create order room time by one day
  // метод коорый передает в админку время которое нужно забронировать данному юзеру
  private saveTimeOrderServer(order) {
    this.roomData.createOrderRoom(order).subscribe((date: OrderRoom) => {
      console.log(date);
      if (date !== null) {
        let timeOrder;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.timeOrder.length; i++) {
          timeOrder = Object.keys(this.timeOrder).map(key =>
            ({
              roomRentalId: this.idRoom,
              orderRoomId: date.id,
              startDate: new Date(this.timeOrder[key].startDate + 'Z'),
              endDate: new Date(this.timeOrder[key].endDate + 'Z')
            }));
        }
        this.roomData.createTimeOrderRoom(timeOrder).subscribe(data => {
          console.log(data);
        });
      }
    });
  }
  // ________________длительный период______________________
  private checkTimeDayRoom() {
    const time = [];
    for (let i = 0; i < this.countDay; i++) {
      for (let e = 0; e < 9; e++) {
        const start = new Date();
        const end = new Date();
        start.setFullYear(this.dayOrder.startDate.getFullYear());
        start.setMonth(this.dayOrder.startDate.getMonth());
        start.setDate(this.dayOrder.startDate.getDate() + i);
        start.setHours(10 + e);
        start.setMinutes(0);
        start.setSeconds(0);
        end.setFullYear(this.dayOrder.startDate.getFullYear());
        end.setMonth(this.dayOrder.startDate.getMonth());
        end.setDate(this.dayOrder.startDate.getDate() + i);
        end.setHours((10 + 1) + e);
        end.setMinutes(0);
        end.setSeconds(0);
        this.translateDaysToTime.set(end, start);
      }
    }
    this.translateDaysToTime.forEach((start, end) => {
      time.push({
        roomRentalId: this.idRoom,
        startDate: new Date(start + 'Z'),
        endDate: new Date(end + 'Z')
      });
    });
    // проверяем зането ли время
    this.roomData.checkedTimeRoom(time, this.idRoom).subscribe((data: StatusMessage) => {
      if (data.message === 'no exist') {
        const {startTime, endTime} = this.setTime();
        const order = this.informationAboutOrder();
        order.price = this.room.priseRoom[0].priceDay * this.countDay;
        order.startTime = startTime;
        order.endTime = endTime;
        this.existTimePeriod = false;
        // вызываем метод для перенаправля юзера на оплату и результат записываем в переменную.
        const statusPayment = this.liqPayInvoiceRoom(order);
        if (statusPayment) {
          this.saveManyDateTime(order);
        }
      } else if (data.message === 'exist') {
        console.log('exist');
        this.existTimePeriod = true;
        this.payment = false;
      }
    });
  }
  // ________устанавливаем начало и конец времени_________
  // set the beginning and end of time
  private setTime() {
    const timeStart = new Date();
    timeStart.setFullYear(this.dayOrder.startDate.getFullYear());
    timeStart.setMonth(this.dayOrder.startDate.getMonth());
    timeStart.setDate(this.dayOrder.startDate.getDate());
    timeStart.setHours(10);
    timeStart.setMinutes(0);
    timeStart.setSeconds(0);
    const startTime = new Date(timeStart + 'Z');
    const timeEnd = new Date();
    timeEnd.setFullYear(this.dayOrder.endDate.getFullYear());
    timeEnd.setMonth(this.dayOrder.endDate.getMonth());
    timeEnd.setDate(this.dayOrder.endDate.getDate());
    timeEnd.setHours(19);
    timeEnd.setMinutes(0);
    timeEnd.setSeconds(0);
    const endTime = new Date(timeEnd + 'Z');
    return {startTime, endTime};
  }
  // _____сохраняем значения длительного периода переформитировав дату в часы________
  // save order many day time;
  private saveManyDateTime(order) {
    const resultArray = [];
    this.roomData.createOrderRoom(order).subscribe((date: OrderRoom) => {
      console.log(date);
      if (date !== null) {
        this.translateDaysToTime.forEach((start, end) => {
          resultArray.push({
            roomRentalId: this.idRoom,
            orderRoomId: date.id,
            startDate: new Date(start + 'Z'),
            endDate: new Date(end + 'Z')
          });
        });
        this.roomData.createTimeOrderRoom(resultArray).subscribe(data => {
          console.log(data);
        });
      }
    });
  }
  // метод который наравляет юзера на оплату
  liqPayInvoiceRoom(order: OrderRoom) {
    return true;
  }
  //
  //
  //
  //
  //
  //
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
}
