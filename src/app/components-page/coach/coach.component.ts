import { AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {Trainers} from '../../shared/model/Trainers.model';
import {Router} from '@angular/router';
import {StartingLoadService} from '../../shared/services/starting-load.service';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {LoaderComponent} from '../../global-components/loader/loader.component';
import {MainLayoutComponent} from '../../main-layout/main-layout.component';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss'],
  animations: [fadingAwayAnimate]
})
export class CoachComponent implements OnInit, OnDestroy, AfterViewChecked {
  location: string;
  trainers: Trainers;
  loader: boolean;
  constructor(
    private startLoad: StartingLoadService,
    private router: Router,
    private loaderComponent: LoaderComponent,
    private serviceHeaderPhoto: LoadingPhotoHeaderService,
    private headerControl: MainLayoutComponent,
    private getReduxData: GetReduxDataService) {
    this.location = 'coach';
    this.loader = true;
    this.loaderComponent.startLoaderPageSpinner();
  }
  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    this.trainers = this.getReduxData.getAllTrainer();
    this.loaderComponent.stopLoaderPageSpinner();
    this.loader = false;
  }
  ngAfterViewChecked(): void {
    this.trainers = this.getReduxData.getAllTrainer();
  }
  redirect(elem) {
    this.router.navigate(['trainings', 'coach', 'resume', elem.id]);
  }
  ngOnDestroy(): void {
  }
}
