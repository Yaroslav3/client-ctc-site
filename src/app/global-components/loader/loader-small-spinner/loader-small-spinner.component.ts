import {Component} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-loader-small-spinner',
  templateUrl: './loader-small-spinner.component.html',
  styleUrls: ['./loader-small-spinner.component.scss']
})
export class LoaderSmallSpinnerComponent {
  constructor(private spinner: NgxSpinnerService) {
  }
  startSmallSpinner() {
    this.spinner.show('smallSpinner',
      {
        type: 'line-spin-fade',
        size: 'default',
        bdColor: 'rgba(94,94,94, .1)',
        color: '#A6A6A6',
        zIndex: 1,
        fullScreen: false
      });
  }
  stopSmallSpinner() {
    this.spinner.hide('smallSpinner');
  }
}
