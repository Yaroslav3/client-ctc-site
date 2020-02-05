import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {Inscriptions} from '../../shared/model/Inscriptions.model';
import {Trainings} from '../../shared/model/Trainings.model';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {Router} from '@angular/router';
import {LoaderPageSpinnerComponent} from '../../global-components/loader/loader-page-spinner/loader-page-spinner.component';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  providers: [LoaderPageSpinnerComponent],
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
              private loaderComponent: LoaderPageSpinnerComponent,
  ) {
    this.location = 'trainings';
  }
  ngOnInit() {
    this.loader = true;
    this.loaderComponent.startLoaderPageSpinner();
    window.scroll(0, 0);
    this.startPage();
    this.loaderComponent.stopLoaderPageSpinner();
    this.loader = false;
  }
  noClickTrainings(id: number) {
    this.router.navigate(['trainings', 'training-show', id]);
  }
  startPage() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    this.trainings = this.getReduxData.getTrainingsAll();
    this.inscriptions = this.getReduxData.getInscriptionsAll();
  }
  ngAfterViewChecked(): void {
    this.startPage();
  }
}

