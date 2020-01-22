import {PhotoWebinars} from './PhotoWebinars.model';
import {WebinarCountStatuses} from './WebinarCountStatuses.model';

export class Webinars {
  id: number;
  name: string;
  theme: string;
  dateEvent: Date;
  timeEvent: string;
  price: number;
  currency: string;
  countPerson: number;
  city: string;
  address: string;
  description: string;
  photoWebinars: PhotoWebinars;
  webinarCountStatuses: WebinarCountStatuses;

}
