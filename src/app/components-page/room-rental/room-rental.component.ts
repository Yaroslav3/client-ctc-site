import { Component, OnInit } from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';

@Component({
  selector: 'app-room-rental',
  templateUrl: './room-rental.component.html',
  styleUrls: ['./room-rental.component.scss']
})
export class RoomRentalComponent implements OnInit {

  location: string;

  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService) {
    this.location = 'room-rental';
  }

  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
  }

}
