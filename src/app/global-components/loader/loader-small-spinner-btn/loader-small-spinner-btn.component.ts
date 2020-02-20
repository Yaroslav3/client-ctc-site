import {Component} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-loader-small-spinner-btn',
  templateUrl: './loader-small-spinner-btn.component.html',
  styleUrls: ['./loader-small-spinner-btn.component.scss']
})
export class LoaderSmallSpinnerBtnComponent {
  constructor(private spinner: NgxSpinnerService) {
  }
  startSmallSpinnerBtn() {
    this.spinner.show('smallSpinner',
      {
        type: 'ball-clip-rotate',
        size: 'small',
        bdColor: 'rgba(0,0,0, .1)',
        color: '#495057',
        zIndex: 1,
        fullScreen: false
      });
  }
  stopSmallSpinnerBtn() {
    this.spinner.hide('smallSpinner');
  }
}
