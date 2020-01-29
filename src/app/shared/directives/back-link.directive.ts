import {Directive, HostListener} from '@angular/core';
import {Location} from '@angular/common';

@Directive({
  selector: '[appBackLink]'
})
export class BackLinkDirective {
  constructor(private location: Location) {
  }
  @HostListener('click')
  onClick() {
    this.location.back();
  }
}

