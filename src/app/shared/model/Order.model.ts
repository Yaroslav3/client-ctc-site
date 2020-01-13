export class Order {
  id: number;
  date: string;
  training: string;
  city: string;
  company: string;
  nameSurname: string;
  phone: string;
  country: string;
  email: string;
  description: string;
  orderTrainers: string;
  status: boolean;
  time: Date;


  constructor(id?: number, date?: string, training?: string, city?: string, company?: string, nameSurname?: string,
              phone?: string, country?: string, email?: string, description?: string, orderTrainers?: string,
              status?: boolean, time?: Date) {

    this.id = id;
    this.date = date;
    this.training = training;
    this.city = city;
    this.company = company;
    this.nameSurname = nameSurname;
    this.phone = phone;
    this.country = country;
    this.email = email;
    this.description = description;
    this.orderTrainers = orderTrainers;
    this.status = status;
    this.time = time;
  }
}
