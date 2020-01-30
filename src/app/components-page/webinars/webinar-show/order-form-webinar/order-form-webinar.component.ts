import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchByIdService} from '../../../../shared/services/search-by-id.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LiqPayOrder} from '../../../../shared/model/LiqPayOrder,model';
import {MainLayoutComponent} from '../../../../main-layout/main-layout.component';
import {WebinarOrder} from '../../../../shared/model/WebinarOrder.model';
import {OrderService} from '../../../../shared/services/order.service';
import {GetReduxDataService} from '../../../../shared/services/get-redux-data.service';
import {fadingAwayAnimate, showAnimate} from '../../../../shared/animations/fading-away.animate';
import {NumericValueType, RxwebValidators} from '@rxweb/reactive-form-validators';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../reduxe';
import {OrderWebinarEmailUser, OrderWebinarNameUser, OrderWebinarPhoneUser} from '../../../../reduxe/vebinars/webinars.action';
import {WebinarOrderForm} from '../../../../shared/model/WebinarOrderForm.model';

@Component({
  selector: 'app-order-form-webinar',
  templateUrl: './order-form-webinar.component.html',
  styleUrls: ['./order-form-webinar.component.scss'],
  animations: [fadingAwayAnimate, showAnimate]
})
export class OrderFormWebinarComponent implements OnInit, AfterContentChecked, OnDestroy {
  idWebinar: number;
  webinar;
  id: number;
  price: number;
  formLiqPay: FormGroup;
  formOrder: WebinarOrderForm;
  isSubmitted = false;
  isLiqPay = true;
  isPaymentMethod = false;
  isLiqPayOne = true;
  isLiqPayTwo = false;
  isLiqPayTree = false;
  liqPayOrder = new LiqPayOrder();
  constructor(
    private headerControl: MainLayoutComponent,
    private getReduxData: GetReduxDataService,
    private fb: FormBuilder,
    private route: Router,
    private store: Store<AppState>,
    private order: OrderService,
    private searchById: SearchByIdService) {
  }
  ngOnInit() {
    this.startPage();
    this.redirect();
    this.createFormGroup();
  }
  ngAfterContentChecked(): void {
  }
  startPage() {
    this.headerControl.hiddenHeaderComponent();
    this.idWebinar = this.searchById.setWebinarId();
    this.webinar = this.getReduxData.getOneWebinars(this.idWebinar);
    this.formOrder = this.getReduxData.getWebinarFormState() as WebinarOrderForm;
    console.log(this.webinar);
  }
  redirect() {
    if (this.webinar === undefined) {
      this.route.navigate(['webinars']);
    }
  }
  createFormGroup() {
    return this.formLiqPay = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10),
        RxwebValidators.numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: false})]],
    });
  }
  public get f() {
    return this.formLiqPay.controls;
  }
  orderWebinar() {
    this.isSubmitted = true;
    if (this.formLiqPay.invalid) {
      return;
    }
    this.isLiqPay = false;
    this.isPaymentMethod = true;
    this.isLiqPayOne = false;
    this.isLiqPayTwo = true;
  }
  liqPayInvoiceWebinar() {
    const webinarOrder = new WebinarOrder(
      this.f.name.value,
      null,
      this.f.email.value,
      this.f.phone.value,
      this.webinar.countPerson,
      this.webinar.price,
      this.webinar.currency,
      this.webinar.name,
      this.webinar.theme,
      this.webinar.id
    );
    console.log(webinarOrder);
    this.order.createWebinarOrder(webinarOrder).subscribe((data: LiqPayOrder) => {
      this.liqPayOrder = data;
      console.log(data);
      this.isLiqPayTwo = false;
      this.isLiqPayTree = true;
      this.isPaymentMethod = false;
    });
  }
  // ____form filling methods from state___
  nameRedux() {
    if (this.formLiqPay.controls.name.valid) {
      this.store.dispatch(new OrderWebinarNameUser(this.formLiqPay.controls.name.value));
    }
  }
  emailRedux() {
    if (this.formLiqPay.controls.email.valid) {
      this.store.dispatch(new OrderWebinarEmailUser(this.formLiqPay.controls.email.value));
    }
  }
  phoneRedux() {
    if (this.formLiqPay.controls.phone.valid) {
      this.store.dispatch(new OrderWebinarPhoneUser(this.formLiqPay.controls.phone.value));
    }
  }
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
  }
}
