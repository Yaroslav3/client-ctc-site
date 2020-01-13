import {Component, OnInit} from '@angular/core';
import {StartingLoadService} from '../../shared/services/starting-load.service';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  location: string;
  dataInfoHome: [];

  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService) {
    this.location = 'home';
  }

  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
  }

}
