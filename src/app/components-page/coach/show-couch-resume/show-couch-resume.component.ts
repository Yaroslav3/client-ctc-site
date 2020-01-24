import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Trainers} from '../../../shared/model/Trainers.model';
import {StartingLoadService} from '../../../shared/services/starting-load.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {MainLayoutComponent} from '../../../main-layout/main-layout.component';
import {FontJsonFileService} from '../../../shared/services/font-json-file.service';
import {fadingAwayAnimate} from '../../../shared/animations/fading-away.animate';
import {GetReduxDataService} from '../../../shared/services/get-redux-data.service';
import {SearchByIdService} from '../../../shared/services/search-by-id.service';

@Component({
  selector: 'app-show-couch-resume',
  templateUrl: './show-couch-resume.component.html',
  styleUrls: ['./show-couch-resume.component.scss'],
  animations: [fadingAwayAnimate]
})
export class ShowCouchResumeComponent implements OnInit, OnDestroy, AfterContentChecked {
  fonts = [];
  trainers: Trainers;
  idCoach: number;
  constructor(private routing: ActivatedRoute,
              private router: Router,
              private getTrainer: GetReduxDataService,
              private getTrainerForId: SearchByIdService,
              private startLoad: StartingLoadService,
              private fontService: FontJsonFileService,
              private transferToId: SearchByIdService,
              private headerControl: MainLayoutComponent) {
    // hide header when we go into the component
    this.headerControl.hiddenHeaderComponent();
  }
  editorConfig: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
    height: 'auto',
    defaultFontSize: '5',
    fonts: this.fonts,
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [ // optional
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
    this.routing.params.subscribe((coachId) => {
      this.idCoach = coachId.id;
      this.getFonts();
      this.getOneTrainer(this.idCoach);

    });
  }
  ngAfterContentChecked(): void {
    this.getOneTrainer(this.idCoach);
  }
  getOneTrainer(id) {
    this.trainers = this.getTrainer.getOneTrainer(id);
  }
  getFonts() { // download fonts for editorConfig.
    this.fontService.getFontJsonFile().subscribe(result => {
      for (let i = 0; i < Object.keys(result).length; i++) {
        this.fonts[i] = result[i];
      }
    });
  }
  ngOnDestroy(): void {
    // show header on exit from the component
    this.headerControl.visibleHeaderComponent();
    this.headerControl.menuScrolling = false;
  }
  transitionToOrder() {
    this.getTrainerForId.getOrderTrainerId(this.trainers.id);
    this.router.navigate(['trainings-order']);
  }
}
