import {AfterContentChecked, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Trainings} from '../../shared/model/Trainings.model';
import {Order} from '../../shared/model/Order.model';
import {OrderService} from '../../shared/services/order.service';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppState} from '../../reduxe';
import {Store} from '@ngrx/store';
import {MainLayoutComponent} from '../../main-layout/main-layout.component';
import {ActivatedRoute, Params} from '@angular/router';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {hiddenAnimate, showAnimate} from '../../shared/animations/fading-away.animate';
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
  protected orderError: Order;
  protected isCreated = false;
  trainings: Trainings;
  trainersCheckbox: any = [];
  myForm: FormGroup;
  orderForm: FormGroup;
  done = true;
  doneOrder = false;
  form: any = {};
  isSubmitted = false;
  allTrainings;
  selectedTrainerId; // Все данные тренера от которого переШли в блок заказа корпоративного трененга
  idTrainerSelectedCheckbox; // Id тренера по которому произошёл клик Checkbox
  photoTrainerSelectedCheckbox; // фото тренера которой выбран через Checkbox
  allPhoto = [];


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private config: NgbDatepickerConfig,
    private orderService: OrderService,
    private getTrainer: GetReduxDataService,
    private router: ActivatedRoute,
    private loaderComponent: LoaderComponent,
    private headerControl: MainLayoutComponent,
    private renderer: Renderer2,
  ) {
    this.headerControl.hiddenHeaderComponent();
    this.myForm = this.fb.group({orderTrainers: this.fb.array([])});
    this.config.outsideDays = 'hidden';
    this.loader = true;
    this.loaderComponent.startSpinner();
  }

  ngOnInit() {
    this.createFormGroup();
    this.router.params.subscribe((params: Params) => {
      this.selectedTrainerId = this.getTrainer.getOneTrainer(params.id);
      console.log(this.selectedTrainerId);
      this.photoTrainerSelectedCheckbox = this.selectedTrainerId.photo[0].photo;
      this.onChange(this.selectedTrainerId.name, this.selectedTrainerId.surname, true, this.selectedTrainerId);
    });
    this.store.select('stateTrainers', 'trainers').subscribe((trainers) => {
      this.trainersCheckbox = Object.keys(trainers).map(key => ({trainers: key, value: trainers[key]}));
    });
    this.store.select('stateTrainings', 'trainings').subscribe((allTrainings) => {
      this.trainings = allTrainings;
      this.allTrainings = allTrainings;
      this.startComponentCheckboxPhoto(this.selectedTrainerId);
    });
    this.loaderComponent.stopSpinner();
    this.loader = false;
  }

  ngAfterContentChecked(): void {
    this.selectedTrainer();
  }

  selectedTrainer() {
    this.router.params.subscribe((params: Params) => {
      this.selectedTrainerId = this.getTrainer.getOneTrainer(params.id);
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

  startComponentCheckboxPhoto(coach) {
    setTimeout(() => {
      const inputElement = document.getElementsByClassName('inputCheckbox');
      const selected = inputElement.namedItem(coach.id);
      this.renderer.setProperty(selected, 'checked', true);
    });
  }

  onChange(name: string, surname: string, isChecked: boolean, coach) {
    const trainersFormArray = this.myForm.controls.orderTrainers as FormArray;
    if (isChecked) {
      this.allPhoto.push(coach);
      this.idTrainerSelectedCheckbox = coach.id;
      this.photoTrainerSelectedCheckbox = coach.photo[0].photo;
      this.trainings = coach.trainerTrainings;
      trainersFormArray.push(new FormControl(name + ' ' + surname));
    } else {
      this.allPhoto = this.allPhoto.filter(c => c.id !== coach.id);
      if (this.allPhoto.length > 0) {
        const editAllPhoto = this.allPhoto[this.allPhoto.length - 1];
        this.idTrainerSelectedCheckbox = editAllPhoto.id;
        this.photoTrainerSelectedCheckbox = editAllPhoto.photo[0].photo;
      } else {
        this.idTrainerSelectedCheckbox = '';
        this.photoTrainerSelectedCheckbox = '';
      }
      const index = trainersFormArray.controls.findIndex(x => x.value === name);
      trainersFormArray.removeAt(index);
    }
    console.log(this.allPhoto);
  }


  submitOrderSave() {
    this.isSubmitted = true;
    if (this.orderForm.invalid) {
      return;
    }
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
    this.orderService.saveOrder(order).subscribe(() => {
        this.isCreated = true;
        this.done = false;
        window.scroll(0, 500);
        this.doneOrder = true;
      },
      error => {
        console.log(error);
        this.orderError = error.error;
        this.isCreated = false;
      });
  }

  // selectedCoach(coach) {
  //   console.log(coach);
  //   this.toggle = true;
  //   if (this.toggle) {
  //     this.idTrainerSelectedCheckbox = coach.value.id;
  //     this.photoTrainerSelectedCheckbox = coach.value.photo[0]['photo'];
  //     this.trainings = coach.value.trainerTrainings;
  //   } else {
  //     this.toggle = false;
  //     this.idTrainerSelectedCheckbox = coach.value.id;
  //     this.photoTrainerSelectedCheckbox = coach.value.photo[0]['photo'];
  //   }
  // }

  // toggleTrainers() {
  //   this.photoTrainerSelectedCheckbox = '';
  //   this.toggle = this.toggle ? false : true;
  //   if (this.toggle) {
  //     this.trainings = this.selectedTrainerId.trainerTrainings;
  //     console.log(this.trainings);
  //   } else {
  //     this.trainings = this.allTrainings;
  //     console.log(this.trainings);
  //   }
  // }

  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
  }
}
