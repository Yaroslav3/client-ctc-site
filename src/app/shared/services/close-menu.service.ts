import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloseMenuService {
  statusMenu ;

  constructor() {
  }

  getCloseMenu(status: boolean) {
    this.statusMenu = status;
  }

  setToggleMenu() {
    console.log(this.statusMenu);
    return this.statusMenu;
  }
}
