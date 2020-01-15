import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Trainings} from '../../shared/model/Trainings.model';
import {Order} from '../../shared/model/Order.model';
import {OrderService} from '../../shared/services/order.service';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppState} from '../../reduxe';
import {Store} from '@ngrx/store';
import {MainLayoutComponent} from '../../main-layout/main-layout.component';
import {ActivatedRoute, Params} from '@angular/router';
import {GetTrainerService} from '../../shared/services/get-trainer.service';
import {hiddenAnimate, showAnimate, fadingAwayAnimate} from '../../shared/animations/fading-away.animate';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [hiddenAnimate, showAnimate, fadingAwayAnimate],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class OrderComponent implements OnInit, AfterContentChecked, OnDestroy {

  protected orderError: Order;
  protected isCreated = false;
  toggle: boolean;
  trainings: Trainings;
  trainersCheckbox: any = [];
  myForm: FormGroup;
  orderForm: FormGroup;
  done = true;
  doneOrder = false;
  form: any = {};
  isSubmitted = false;
  selectedTrainerId;
  photoTrainerSelectedCheckbox;
  idTrainerSelectedCheckbox;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private config: NgbDatepickerConfig,
    private orderService: OrderService,
    private getTrainer: GetTrainerService,
    private router: ActivatedRoute,
    private headerControl: MainLayoutComponent
  ) {
    this.toggle = true;
    this.headerControl.hiddenHeaderComponent();
    this.myForm = this.fb.group({orderTrainers: this.fb.array([])});
    this.config.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.createFormGroup();
    this.store.select('stateTrainings', 'trainings').subscribe((allTrainings) => {
      this.trainings = allTrainings;
    });
    this.store.select('stateTrainers', 'trainers').subscribe((trainers) => {
      this.trainersCheckbox = Object.keys(trainers).map(key => ({trainers: key, value: trainers[key]}));
      console.log(this.trainersCheckbox);
    });
  }

  ngAfterContentChecked(): void {
    this.selectedTrainer();
  }

  selectedTrainer() {
    this.router.params.subscribe((params: Params) => {
      this.selectedTrainerId = this.getTrainer.getOneTrainer(params.id);
      console.log(this.selectedTrainerId);
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


  onChange(name: string, surname: string, isChecked: boolean) {
    const trainersFormArray = this.myForm.controls.orderTrainers as FormArray;
    if (isChecked) {
      trainersFormArray.push(new FormControl(name + ' ' + surname));
    } else {
      const index = trainersFormArray.controls.findIndex(x => x.value === name);
      trainersFormArray.removeAt(index);
    }
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

  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
  }

  selectedCoach(coach) {
    this.idTrainerSelectedCheckbox = coach.value.id;
    this.photoTrainerSelectedCheckbox = coach.value.photo[0]['photo'];
    const selectedTrainings = coach.value.trainerTrainings;
    this.trainings = selectedTrainings;
  }

  toggleTrainers() {
    this.photoTrainerSelectedCheckbox = '';
    this.toggle = this.toggle ? false : true;
    console.log(this.toggle);
  }
}
