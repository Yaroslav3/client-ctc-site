import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchByIdService} from '../../../../shared/services/search-by-id.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LiqPayOrder} from '../../../../shared/model/LiqPayOrder,model';
import {MainLayoutComponent} from '../../../../main-layout/main-layout.component';
import {WebinarOrder} from '../../../../shared/model/WebinarOrder.model';
import {OrderService} from '../../../../shared/services/order.service';
import {GetReduxDataService} from '../../../../shared/services/get-redux-data.service';
import {fadingAwayAnimate} from '../../../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-order-form-webinar',
  templateUrl: './order-form-webinar.component.html',
  styleUrls: ['./order-form-webinar.component.scss'],
  animations: [fadingAwayAnimate]
})
export class OrderFormWebinarComponent implements OnInit, AfterContentChecked, OnDestroy {
  idWebinar: number;
  webinar;
  id: number;
  price: number;
  formLiqPay: FormGroup;
  isSubmitted = false;
  isLiqPay = true;
  isPaymentMethod = false;
  isLiqPayOne = true;
  isLiqPayTwo = false;
  isLiqPayTree = false;
  liqPayOrder = new LiqPayOrder();
  constructor(private router: Router,
              private headerControl: MainLayoutComponent,
              private getReduxData: GetReduxDataService,
              private fb: FormBuilder,
              private route: Router,
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
      phone: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  public get f() {
    return this.formLiqPay.controls;
  }
  back() {
    this.router.navigate(['webinars/webinar-show', this.idWebinar]);
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
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
  }
  liqPayInvoiceWebinar() {
    const webinarOrder = new WebinarOrder(
      this.f.name.value,
      null,
      this.f.email.value,
      this.f.phone.value,
      this.webinar.countPerson = 1,
      this.webinar.price,
      this.webinar.currency,
      this.webinar.name,
      this.webinar.theme,
      this.webinar.id
    );
    this.order.createWebinarOrder(webinarOrder).subscribe((data: LiqPayOrder) => {
      this.liqPayOrder = data;
      this.isLiqPayTwo = false;
      this.isLiqPayTree = true;
      this.isPaymentMethod = false;
    });
  }
}
