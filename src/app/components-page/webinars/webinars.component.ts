import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {Webinars} from '../../shared/model/Webinars.model';
import {WebinarInscription} from '../../shared/model/WebinarInscription.model';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-webinars',
  templateUrl: './webinars.component.html',
  styleUrls: ['./webinars.component.scss'],
  animations: [fadingAwayAnimate]
})
export class WebinarsComponent implements OnInit, AfterContentChecked {
  location: string;
  inscriptions;
  webinars: Webinars;
  count = Array();
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private getReduxData: GetReduxDataService) {
    this.location = 'webinars';
  }
  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    // this.inscriptions = this.getReduxData.getWebinarsInscription();
    // this.webinars = this.getReduxData.getWebinars();
    console.log(this.webinars);
    console.log(this.inscriptions);
  }
  ngAfterContentChecked(): void {
    this.inscriptions = this.getReduxData.getWebinarsInscription();
    this.webinars = this.getReduxData.getWebinars();
  }
  noClickWebinars(id: any) {
  }
}
