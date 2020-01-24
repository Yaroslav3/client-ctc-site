import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {Webinars} from '../../shared/model/Webinars.model';
import {WebinarInscription} from '../../shared/model/WebinarInscription.model';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {Router} from '@angular/router';

@Component({
  selector: 'app-webinars',
  templateUrl: './webinars.component.html',
  styleUrls: ['./webinars.component.scss'],
  animations: [fadingAwayAnimate]
})
export class WebinarsComponent implements OnInit, AfterContentChecked {
  location: string;
  inscriptions: WebinarInscription;
  webinars: Webinars;
  count = Array();
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private route: Router,
              private getReduxData: GetReduxDataService) {
    this.location = 'webinars';
  }
  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
  }
  ngAfterContentChecked(): void {
    this.inscriptions = this.getReduxData.getWebinarsInscription();
    this.webinars = this.getReduxData.getWebinars();
    this.getAllWebinars();
  }
  getAllWebinars() {
    const webinars = this.getReduxData.getWebinars();
    for (let i = 0; i < Object.keys(webinars).length; i++) {
      this.count.push(Object.keys(webinars[i].webinarCountStatuses).length);
    }
  }
  noClickWebinars(id: any) {
    this.route.navigate(['webinars/webinar-show', id]);
  }
}
