import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterContentChecked {
  burgerMenu: boolean;
  @Input() correctedMenu: boolean;
  @Input() menuScrolling: boolean;

  constructor() {
    this.burgerMenu = false;
  }

  ngOnInit() {
  }

  burger() {
    this.burgerMenu = this.burgerMenu ? false : true;
    if (this.burgerMenu === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }

  burgerHidden() {
    this.burgerMenu = false;
    document.body.style.overflow = 'visible';
  }

  menuScrollingClose() {
    this.menuScrolling = false;
  }



  ngAfterContentChecked(): void {
  }
}
