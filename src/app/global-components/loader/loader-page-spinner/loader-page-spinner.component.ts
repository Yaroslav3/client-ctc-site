import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-loader-page-spinner',
  templateUrl: './loader-page-spinner.component.html',
  styleUrls: ['./loader-page-spinner.component.scss']
})
export class LoaderPageSpinnerComponent implements OnInit {
  loaderPageSpinner;
  constructor(private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
  }
  startLoaderPageSpinner() {
    this.spinner.show('loaderPageSpinner',
      {
        type: 'line-spin-fade',
        size: 'default',
        bdColor: 'transparent',
        color: '#B86061',
        zIndex: 1,
        fullScreen: false
      });
  }
  stopLoaderPageSpinner() {
    this.spinner.hide('loaderPageSpinner');
  }
}
