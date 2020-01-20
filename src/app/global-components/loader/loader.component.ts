import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [fadingAwayAnimate]
})
export class LoaderComponent implements OnInit {
  bigSpinner: boolean;
  smallSpinner: boolean;
  loaderPageSpinner: boolean;
  constructor(private spinner: NgxSpinnerService) {
    this.bigSpinner = true;
    this.smallSpinner = true;
    this.loaderPageSpinner = true;
  }
  ngOnInit() {
  }
  startSpinner() {
    this.smallSpinner = false;
    this.loaderPageSpinner = false;
    this.bigSpinner = true;
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
    this.bigSpinner = true;
    this.loaderPageSpinner = true;
    this.smallSpinner = false;
  }
  startSmallSpinner() {
    this.bigSpinner = false;
    this.loaderPageSpinner = false;
    this.smallSpinner = true;
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
    this.smallSpinner = false;
    this.bigSpinner = true;
    this.loaderPageSpinner = true;
  }
  startLoaderPageSpinner() {
    this.bigSpinner = false;
    this.smallSpinner = false;
    this.loaderPageSpinner = true;
    this.spinner.show('loaderPageSpinner',
      {
        type: 'line-spin-fade',
        size: 'default',
        bdColor: 'transparent',
        color: 'black',
        zIndex: 1,
        fullScreen: false
      });
  }
  stopLoaderPageSpinner() {
    this.bigSpinner = true;
    this.smallSpinner = true;
    this.loaderPageSpinner = false;
    this.spinner.hide('loaderPageSpinner');
  }
}
