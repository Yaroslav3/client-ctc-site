import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  burgerMenu: boolean;
  @Input() correctedMenu: boolean;
  @Input() menuScrolling: boolean;
  constructor() {
    this.burgerMenu = false;
  }
  ngOnInit() {
  }
  @HostListener('window:mouseenter')
  hiddenScrollLine() {
    const w = document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.width = w + 'px';
  }
  @HostListener('window:mouseleave')
  visualScrollLine() {
    setTimeout(() => {
      document.body.style.overflow = 'initial';
      document.body.style.width = 'auto';
    }, 500);
  }
  burger() {
    this.burgerMenu = this.burgerMenu ? false : true;
    if (this.burgerMenu === true) {
      this.hiddenScrollLine();
    } else {
      this.visualScrollLine();
    }
  }
  burgerHidden() {
    this.burgerMenu = false;
    this.visualScrollLine();
  }
  menuScrollingClose() {
    this.menuScrolling = false;
  }
}
