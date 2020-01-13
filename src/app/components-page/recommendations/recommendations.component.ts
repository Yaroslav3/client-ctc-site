import { Component, OnInit } from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  location: string;
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService) {
    this.location = 'recommendations';
  }
  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
  }
}
