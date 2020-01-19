import {Component, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {Inscriptions} from '../../shared/model/Inscriptions.model';
import {Trainings} from '../../shared/model/Trainings.model';
import {StartingLoadService} from '../../shared/services/starting-load.service';


@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {
  trainings: Trainings;
  inscriptions: Inscriptions;
  location: string;

  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private  loadingServer: StartingLoadService,
              private startLoader: StartingLoadService
  ) {
    this.location = 'trainings';
  }

  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    this.startLoader.getAllInscription().subscribe(data => {
      console.log(data);
    });
    this.startLoader.getAllInscriptions().subscribe(d => {
      console.log(d);
    });

  }

}
