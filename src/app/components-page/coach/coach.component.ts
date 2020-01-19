import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {Trainers} from '../../shared/model/Trainers.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';
import {Router} from '@angular/router';
import {StartingLoadService} from '../../shared/services/starting-load.service';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';
import {GetReduxDataService} from '../../shared/services/get-redux-data.service';
import {Observable, Observer} from 'rxjs';


@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss'],
  animations: [fadingAwayAnimate]
})
export class CoachComponent implements OnInit, OnDestroy, AfterViewChecked {
  location: string;
  trainers: Trainers;

  constructor(
    private startLoad: StartingLoadService,
    private router: Router,
    private serviceHeaderPhoto: LoadingPhotoHeaderService,
    private getReduxData: GetReduxDataService) {
    this.location = 'coach';
  }

  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
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
