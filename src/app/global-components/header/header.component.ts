import {Component, Input, OnInit} from '@angular/core';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadingAwayAnimate]
})
export class HeaderComponent implements OnInit {
  titleText = 'Corporate Training Company, since 1999';
  hiddenHeader: boolean;
  @Input() correctedHeader: boolean;
  constructor() {
    this.hiddenHeader = false;
  }
  ngOnInit() {
  }
}
