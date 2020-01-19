import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) {
  }
  ngOnInit() {

  }
  startSpinner() {
    this.spinner.show('spinner', {
      type: 'timer',
      size: 'default',
      bdColor: 'rgba(0,0,0, .4)',
      color: 'write'
    });
  }
  stopSpinner() {
    this.spinner.hide('spinner');
  }

}
