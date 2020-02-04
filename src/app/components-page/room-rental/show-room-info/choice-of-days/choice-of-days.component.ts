import {Component, Input, OnInit} from '@angular/core';
import {fadingAwayAnimate, showAnimate} from '../../../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-choice-of-days',
  templateUrl: './choice-of-days.component.html',
  styleUrls: ['./choice-of-days.component.scss'],
  animations: [showAnimate, fadingAwayAnimate],
})
export class ChoiceOfDaysComponent   implements OnInit {
  @Input() idRoom;
  constructor() {
  }
  ngOnInit() {
  }
}
