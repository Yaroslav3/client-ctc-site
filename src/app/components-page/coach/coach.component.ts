import {Component, OnInit} from '@angular/core';
import {LoadingPhotoHeaderService} from '../../shared/services/loading-photo-header.service';
import {Trainers} from '../../shared/model/Trainers.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';
import {Router} from '@angular/router';
import {StartingLoadService} from '../../shared/services/starting-load.service';
import {fadingAwayAnimate} from '../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss'],
  animations: [fadingAwayAnimate]
})
export class CoachComponent implements OnInit {
  location: string;
  public trainers: Trainers;

  constructor(
    private startLoad: StartingLoadService,
    private router: Router,
    private serviceHeaderPhoto: LoadingPhotoHeaderService,
    private store: Store<AppState>) {
    this.location = 'coach';
  }

  ngOnInit() {
    this.serviceHeaderPhoto.setPhotoLoadingHeader(this.location);
    this.store.select('stateTrainers', 'trainers').subscribe((AllTrainers: Trainers) => {
      this.trainers = AllTrainers;
    });
  }

  redirect(elem) {
    this.router.navigate(['trainings', 'coach', 'resume', elem.id]);
  }

}
