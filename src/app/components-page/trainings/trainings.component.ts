
import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {Inscriptions} from '../../shared/model/Inscriptions.model';
import {Trainings} from '../../shared/model/Trainings.model';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {LoaderComponent} from '../../global-components/loader/loader.component';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {Router} from '@angular/router';




@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  animations: [fadingAwayAnimate]
})
export class TrainingsComponent implements OnInit, AfterViewChecked {
  trainings: Trainings;
  inscriptions: Inscriptions;
  location: string;
  loader: boolean;
  constructor(private serviceHeaderPhoto: LoadingPhotoHeaderService,
              private router: Router,
              private getReduxData: GetReduxDataService,
              private loaderComponent: LoaderComponent,
  ) {
    this.location = 'trainings';
    this.loader = true;
    this.loaderComponent.startLoaderPageSpinner();
  }
  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    this.trainings = this.getReduxData.getTrainingsAll();
    this.inscriptions = this.getReduxData.getInscriptionsAll();
    console.log(this.inscriptions);
    this.loaderComponent.stopLoaderPageSpinner();
    this.loader = false;
  }
  noClickTrainings(id: number) {
    this.router.navigate(['trainings', 'training-show', id]);
  }
  ngAfterViewChecked(): void {
    this.trainings = this.getReduxData.getTrainingsAll();
    this.inscriptions = this.getReduxData.getInscriptionsAll();
  }

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
