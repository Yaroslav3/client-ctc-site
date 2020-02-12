import {RoomDatePeriod} from './RoomDatePeriod.model';

export class OrderRoom {
  id: number;
  nameSurname: string;
  email: string;
  phone: string;
  price: number;
  currency: string;
  description: string;
  startTime: Date;
  endTime: Date;
  roomRentalId: number;
  dateRoom: RoomDatePeriod;
  createOrderTime: Date;
  nameRoom: string;
}
