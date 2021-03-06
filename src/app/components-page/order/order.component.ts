import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Trainings} from '../../shared/model/Trainings.model';
import {Order} from '../../shared/model/Order.model';
import {OrderService} from '../../shared/services/order.service';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppState} from '../../reduxe';
import {Store} from '@ngrx/store';
import {DateValidator} from '../../shared/validators/validators.date';
import {MainLayoutComponent} from '../../main-layout/main-layout.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {hiddenAnimate, showAnimate, fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {SearchByIdService} from '../../shared/services/search-by-id.service';
import {OrderTrainingsForm} from '../../shared/model/OrderTrainings.model';
import {
  OrderTrainingsReduxCity,
  OrderTrainingsReduxCountry,
  OrderTrainingsReduxDate,
  OrderTrainingsReduxDescription, OrderTrainingsReduxEmail,
  OrderTrainingsReduxNameCompany,
  OrderTrainingsReduxNameSurname,
  OrderTrainingsReduxPhone,
  OrderTrainingsReduxTraining
} from '../../reduxe/trainings/trainings.action';
import {LoaderSmallSpinnerComponent} from '../../global-components/loader/loader-small-spinner/loader-small-spinner.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [LoaderSmallSpinnerComponent, {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  animations: [hiddenAnimate, showAnimate, fadingAwayAnimate],
})
export class OrderComponent implements OnInit, OnDestroy {
  loader: boolean;
  orderError: Order;
  isCreated = false;
  trainings: Trainings;
  trainersCheckbox: any = [];
  myForm: FormGroup;
  formRedux: OrderTrainingsForm;
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
    private loaderComponent: LoaderSmallSpinnerComponent,
    private headerControl: MainLayoutComponent,
    private renderer: Renderer2,
    private getTrainerForId: SearchByIdService,
  ) {
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
    this.dataCorrectedCalendar();
    if (this.selectedTrainerId) {
      this.photoTrainerSelectedCheckbox = this.selectedTrainerId.photo[0].photo;
      this.formRedux = this.getReduxData.getTrainingFormState() as OrderTrainingsForm;
      this.dataCorrectedCalendar();
      this.formRedux.training = this.formRedux.training ? this.formRedux.training : this.trainings[0].name;
      this.onChange(this.selectedTrainerId.name, this.selectedTrainerId.surname, true, this.selectedTrainerId);
      this.startComponentCheckboxCoach(this.selectedTrainerId);
      this.loader = false;
    }
    if (this.selectedTrainerId === undefined) {
      console.log(this.selectedTrainerId);
      this.trainersCheckbox = this.getReduxData.getTrainers();
      this.trainings = this.getReduxData.getTrainingsAll();
      this.formRedux = this.getReduxData.getTrainingFormState() as OrderTrainingsForm;
      this.dataCorrectedCalendar();
      console.log(this.trainersCheckbox);
      if (!this.trainersCheckbox.length) {
        this.routerLink.navigate(['trainings/coach']);
        this.headerControl.visibleHeaderComponent();
      }
      this.loader = false;
    }
  }
  selectedTrainer() {
    let status;
    const selectedTrainerId = this.getTrainerForId.setOrderTrainerId();
    if (selectedTrainerId === undefined || selectedTrainerId === null) {
      status = undefined;
    } else {
      status = this.selectedTrainerId = this.getReduxData.getOneTrainer(selectedTrainerId);
    }
    return status;
  }
  dataCorrectedCalendar() { // метод который деактивирует прошедшую дату
    const current = new Date();
    this.config.minDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    this.config.outsideDays = 'hidden';
  }
  createFormGroup() {
    return this.orderForm = this.fb.group({
      date: ['', [Validators.compose([Validators.required, DateValidator.dateValid])]],
      training: ['', [Validators.required]],
      city: ['', [Validators.required]],
      company: ['', [Validators.required]],
      nameSurname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(14)]],
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
    order.phone = Number(this.orderForm.controls.phone.value.replace(/[- ()]/g, ''));
    order.email = this.orderForm.controls.email.value;
    order.description = this.orderForm.controls.description.value;
    this.orderService.saveOrder(order).subscribe(() => {
        setTimeout(() => {
          this.isSubmitted = true;
          this.loaderSubmit = false;
          this.loaderComponent.stopSmallSpinner();
          this.done = false;
          window.scroll(0, 0);
          this.doneOrder = true;
        }, 1000);
      },
      error => {
        this.orderError = error.error;
        this.isCreated = false;
      });
  }
  // ____form filling methods from state___
  dataRedux() {
    console.log(this.orderForm.controls.date.value);
    if (this.orderForm.controls.date.valid) {
      this.store.dispatch(new OrderTrainingsReduxDate(this.orderForm.controls.date.value));
    }
  }
  trainingRedux() {
    if (this.orderForm.controls.training.valid) {
      this.store.dispatch(new OrderTrainingsReduxTraining(this.orderForm.controls.training.value));
    }
  }
  countryRedux() {
    if (this.orderForm.controls.country.valid) {
      this.store.dispatch(new OrderTrainingsReduxCountry(this.orderForm.controls.country.value));
    }
  }
  cityRedux() {
    if (this.orderForm.controls.city.valid) {
      this.store.dispatch(new OrderTrainingsReduxCity(this.orderForm.controls.city.value));
    }
  }
  nameCompanyRedux() {
    if (this.orderForm.controls.company.valid) {
      this.store.dispatch(new OrderTrainingsReduxNameCompany(this.orderForm.controls.company.value));
    }
  }
  nameRedux() {
    if (this.orderForm.controls.nameSurname.valid) {
      this.store.dispatch(new OrderTrainingsReduxNameSurname(this.orderForm.controls.nameSurname.value));
    }
  }
  emailRedux() {
    if (this.orderForm.controls.email.valid) {
      this.store.dispatch(new OrderTrainingsReduxEmail(this.orderForm.controls.email.value));
    }
  }
  phoneRedux() {
    if (this.orderForm.controls.phone.valid) {
      this.store.dispatch(new OrderTrainingsReduxPhone(this.orderForm.controls.phone.value));
    }
  }
  descriptionRedux() {
    if (this.orderForm.controls.description.valid) {
      this.store.dispatch(new OrderTrainingsReduxDescription(this.orderForm.controls.description.value));
    }
  }
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
    this.loaderSubmit = false;
    this.getTrainerForId.getOrderTrainerId(null);
    this.loaderComponent.stopSmallSpinner();
  }
}
