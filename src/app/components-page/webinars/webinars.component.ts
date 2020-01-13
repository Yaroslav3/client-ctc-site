import {Component, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';

@Component({
  selector: 'app-webinars',
  templateUrl: './webinars.component.html',
  styleUrls: ['./webinars.component.scss']
})
export class WebinarsComponent implements OnInit {
  location: string;
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService) {
    this.location = 'webinars';
  }

  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
  }

}
