import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Trainers} from '../../../shared/model/Trainers.model';
import {TrainingsShow} from '../../../shared/model/TrainingsShow.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetReduxDataService} from '../../../shared/services/get-redux-data.service';
import {MainLayoutComponent} from '../../../main-layout/main-layout.component';
import {StartingLoadService} from '../../../shared/services/starting-load.service';
import {LoaderComponent} from '../../../global-components/loader/loader.component';
import {fadingAwayAnimate} from '../../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-training-show',
  templateUrl: './training-show.component.html',
  styleUrls: ['./training-show.component.scss'],
  animations: [fadingAwayAnimate]
})
export class TrainingShowComponent implements OnInit, AfterContentChecked, OnDestroy {
  id: number;
  selectFile: File = null;
  training: TrainingsShow;
  trainers: Trainers;
  loader: boolean;
  constructor(private idTraining: ActivatedRoute,
              private getReduxData: GetReduxDataService,
              private headerControl: MainLayoutComponent,
              private startingLoad: StartingLoadService,
              private loaderComponent: LoaderComponent,
              // private serviceTrainers: TrainersService,
              // private serviceTrainings: TrainingsService,
              private pouter: Router,
              // private filePDFService: FilePDFService
  ) {
    // hide header when we go into the component
    this.headerControl.hiddenHeaderComponent();
    this.loader = true;
    this.loaderComponent.startLoaderPageSpinner();
  }
  editorConfig: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
    height: 'auto',
    defaultFontSize: '5',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };
  ngOnInit() {
    this.idTraining.params.subscribe((params: Params) => {
      this.startingLoad.getOneTrainings(params.id).subscribe((oneTraining: TrainingsShow) => {
        this.training = oneTraining;
        console.log(oneTraining);
      });
      console.log(this.training);
    });
    this.loader = false;
    this.loaderComponent.stopLoaderPageSpinner();
  }
  ngAfterContentChecked(): void {
    this.idTraining.params.subscribe((params: Params) => {
      // this.training = this.getReduxData.getOneTraining(params.id);
    });
  }
  ngOnDestroy(): void {
    // show header on exit from the component
    this.headerControl.visibleHeaderComponent();
  }
}
