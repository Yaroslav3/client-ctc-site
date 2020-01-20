import {AfterContentChecked, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Trainings} from '../../shared/model/Trainings.model';
import {Order} from '../../shared/model/Order.model';
import {OrderService} from '../../shared/services/order.service';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppState} from '../../reduxe';
import {Store} from '@ngrx/store';
import {MainLayoutComponent} from '../../main-layout/main-layout.component';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {hiddenAnimate, showAnimate, fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {LoaderComponent} from '../../global-components/loader/loader.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [hiddenAnimate, showAnimate],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class OrderComponent implements OnInit, AfterContentChecked, OnDestroy {
  loader: boolean;
  orderError: Order;
  isCreated = false;
  trainings: Trainings;
  trainersCheckbox: any = [];
  myForm: FormGroup;
  orderForm: FormGroup;
  done = true;
  loaderSubmit: boolean;
  doneOrder = false;
  form: any = {};
  isSubmitted = false;
  selectedTrainerId; // Все данные тренера от которого перешли в блок заказа корпоративного трененга
  idTrainerSelectedCheckbox; // Id тренера по которому произошёл клик Checkbox
  photoTrainerSelectedCheckbox; // фото тренера которой выбран через Checkbox
  coachSelectedCheckbox = [];

  constructor(
    private fb: FormBuilder,
    private routerLink: Router,
    private store: Store<AppState>,
    private config: NgbDatepickerConfig,
    private orderService: OrderService,
    private getReduxData: GetReduxDataService,
    private router: ActivatedRoute,
    private loaderComponent: LoaderComponent,
    private headerControl: MainLayoutComponent,
    private renderer: Renderer2,
  ) {
    this.config.outsideDays = 'hidden';
    this.loaderSubmit = false;
  }
  ngOnInit() {
    this.loader = true;
    this.headerControl.hiddenHeaderComponent();
    this.loaderComponent.startSmallSpinner();
    this.myForm = this.fb.group({orderTrainers: this.fb.array([])});
    this.selectedTrainer();
    this.createFormGroup();
    this.trainersCheckbox = this.getReduxData.getTrainers();
    this.trainings = this.getReduxData.getTrainingsAll();
    console.log(this.trainings);
    if (this.selectedTrainerId) {
      this.photoTrainerSelectedCheckbox = this.selectedTrainerId.photo[0].photo;
      this.onChange(this.selectedTrainerId.name, this.selectedTrainerId.surname, true, this.selectedTrainerId);
      this.startComponentCheckboxCoach(this.selectedTrainerId);
      this.loader = false;
    } else {
      this.routerLink.navigate(['trainings/coach']);
      this.loader = false;
    }

  

  }
  ngAfterContentChecked(): void {
  }
  selectedTrainer() {
    this.router.params.subscribe((params: Params) => {
      this.selectedTrainerId = this.getReduxData.getOneTrainer(params.id);
    });
  }
  createFormGroup() {
    return this.orderForm = this.fb.group({
      date: ['', [Validators.required]],
      training: ['', [Validators.required]],
      city: ['', [Validators.required]],
      company: ['', [Validators.required]],
      nameSurname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.maxLength(1025)]],
    });
  }
  public get f() {
    return this.orderForm.controls;
  }
  startComponentCheckboxCoach(coach) {
    setTimeout(() => {
      const inputElement = document.getElementsByClassName('inputCheckbox');
      const selected = inputElement.namedItem(coach.id);
      this.renderer.setProperty(selected, 'checked', true);
    });
  }
  onChange(name: string, surname: string, isChecked: boolean, coach) {
    const trainersFormArray = this.myForm.controls.orderTrainers as FormArray;
    if (isChecked) {
      this.coachSelectedCheckbox.push(coach);
      this.idTrainerSelectedCheckbox = coach.id;
      this.photoTrainerSelectedCheckbox = coach.photo[0].photo;
      trainersFormArray.push(new FormControl(name + ' ' + surname));
    } else {
      this.coachSelectedCheckbox = this.coachSelectedCheckbox.filter(c => c.id !== coach.id);
      if (this.coachSelectedCheckbox.length > 0) {
        const editAllPhoto = this.coachSelectedCheckbox[this.coachSelectedCheckbox.length - 1];
        this.idTrainerSelectedCheckbox = editAllPhoto.id;
        this.photoTrainerSelectedCheckbox = editAllPhoto.photo[0].photo;
      } else {
        this.idTrainerSelectedCheckbox = '';
        this.photoTrainerSelectedCheckbox = '';
      }
      const index = trainersFormArray.controls.findIndex(x => x.value === name);
      trainersFormArray.removeAt(index);
    }
  }
  submitOrderSave() {
    this.isSubmitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    this.loaderSubmit = true;
    this.loaderComponent.startSmallSpinner();
    const order: Order = new Order();
    order.orderTrainers = this.myForm.controls.orderTrainers.value.join(' , ');
    order.date = this.orderForm.controls.date.value;
    order.training = this.orderForm.controls.training.value;
    order.country = this.orderForm.controls.country.value;
    order.city = this.orderForm.controls.city.value;
    order.company = this.orderForm.controls.company.value;
    order.nameSurname = this.orderForm.controls.nameSurname.value;
    order.phone = this.orderForm.controls.phone.value;
    order.email = this.orderForm.controls.email.value;
    order.description = this.orderForm.controls.description.value;
    console.log(order);
    this.orderService.saveOrder(order).subscribe(() => {
        setTimeout(() => {
          this.isSubmitted = true;
          this.loaderSubmit = false;
          this.loaderComponent.stopSmallSpinner();
          this.done = false;
          window.scroll(0, 100);
          this.doneOrder = true;
        }, 1000);
      },
      error => {
        console.log(error);
        this.orderError = error.error;
        this.isCreated = false;
      });
  }
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
    this.loaderSubmit = false;
    this.loaderComponent.stopSmallSpinner();
}
}