import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {Room} from '../../shared/model/Room.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-room-rental',
  templateUrl: './room-rental.component.html',
  styleUrls: ['./room-rental.component.scss'],
  animations: [fadingAwayAnimate]
})
export class RoomRentalComponent implements OnInit, AfterContentChecked {
  location: string;
  room: Room;
  isList = false;
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private getReduxData: GetReduxDataService) {
    this.location = 'room-rental';
  }
  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    this.room = this.getReduxData.getAllRoomState();
    if (this.room) {
      this.isList = false;
      console.log(this.room);
    } else {
      this.isList = true;
    }
  }
  ngAfterContentChecked(): void {
    this.room = this.getReduxData.getAllRoomState();
  }
}
