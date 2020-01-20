import { Component, OnInit } from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  location: string;

  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService) {
    this.location = 'schedule';
  }

  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
  }
}
