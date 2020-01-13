import {Directive, EventEmitter, HostListener, Output} from '@angular/core';


@Directive({
  selector: '[appScroll]',
})

export class ScrollDirective {
  @Output() numberScroll = new EventEmitter<number>();

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetTop;
    this.numberScroll.emit(pos);
  }

}

