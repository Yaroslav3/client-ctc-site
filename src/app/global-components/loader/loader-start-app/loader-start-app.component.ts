import {Component} from '@angular/core';
import {fadingAwayAnimate} from '../../../shared/animations/fading-away.animate';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-loader-start-app',
  templateUrl: './loader-start-app.component.html',
  styleUrls: ['./loader-start-app.component.scss'],
  animations: [fadingAwayAnimate]
})
export class LoaderStartAppComponent {
  constructor(private spinner: NgxSpinnerService) {
  }
  startSpinner() {
    this.spinner.show('spinner', {
      type: 'line-scale',
      size: 'medium',
      bdColor: 'rgba(0,0,0, .3)',
      color: 'white',
      fullScreen: true,
    });
  }
  stopSpinner() {
    this.spinner.hide('spinner');
  }
}
