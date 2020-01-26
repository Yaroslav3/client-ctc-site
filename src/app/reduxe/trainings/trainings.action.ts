import {Action} from 'redux';

export enum Trainings {
  TrainingsAll = 'TrainingsAll',
}

export enum OrderTrainings {
  Date = 'Date',
  Training = 'Training',
  Country = 'Country',
  City = 'City',
  NameCompany = 'NameCompany',
  NameSurname = 'NameSurname',
  Phone = 'Phone',
  Email = ' Email',
  Description = 'Description'
}

export class AllTrainings implements Action {
  readonly type = Trainings.TrainingsAll;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxDate implements Action {
  readonly type = OrderTrainings.Date;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxTraining implements Action {
  readonly type = OrderTrainings.Training;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxCountry implements Action {
  readonly type = OrderTrainings.Country;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxCity implements Action {
  readonly type = OrderTrainings.City;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxNameCompany implements Action {
  readonly type = OrderTrainings.NameCompany;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxNameSurname implements Action {
  readonly type = OrderTrainings.NameSurname;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxPhone implements Action {
  readonly type = OrderTrainings.Phone;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxEmail implements Action {
  readonly type = OrderTrainings.Email;
  constructor(public payload) {
  }
}

export class OrderTrainingsReduxDescription implements Action {
  readonly type = OrderTrainings.Description;
  constructor(public payload) {
  }
}

export type InfoTrainings = AllTrainings
  | OrderTrainingsReduxDate
  | OrderTrainingsReduxTraining
  | OrderTrainingsReduxCountry
  | OrderTrainingsReduxCity
  | OrderTrainingsReduxNameCompany
  | OrderTrainingsReduxNameSurname
  | OrderTrainingsReduxPhone
  | OrderTrainingsReduxEmail
  | OrderTrainingsReduxDescription;

