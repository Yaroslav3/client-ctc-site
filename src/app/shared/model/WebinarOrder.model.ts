export class WebinarOrder {
  // id?: number;
  // status?: string;
  nameAndLastName: string;
  email: string;
  phone: string;
  countPerson: number;
  price: number;
  currency: string;
  nameWebinar: string;
  theme: string;
  idWebinars: number;
  constructor(nameAndLastName: string, status: string, email: string, phone: string, countPerson: number, price: number,
              currency: string, nameWebinar: string, theme: string, idWebinars: number,
              // id?: number
  ) {
    // this.id = id;
    // this.status = status;
    this.nameAndLastName = nameAndLastName;
    this.email = email;
    this.phone = phone;
    this.countPerson = countPerson;
    this.price = price;
    this.currency = currency;
    this.nameWebinar = nameWebinar;
    this.theme = theme;
    this.idWebinars = idWebinars;
  }
}
