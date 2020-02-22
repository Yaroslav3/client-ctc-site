import {Component, OnDestroy, OnInit} from '@angular/core';
import {Trainers} from '../../../shared/model/Trainers.model';
import {TrainingsShow} from '../../../shared/model/TrainingsShow.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetReduxDataService} from '../../../shared/services/get-redux-data.service';
import {MainLayoutComponent} from '../../../main-layout/main-layout.component';
import {StartingLoadService} from '../../../shared/services/starting-load.service';
import {fadingAwayAnimate} from '../../../shared/animations/fading-away.animate';
import {FilePdfService} from '../../../shared/services/file-pdf.service';
import {FontJsonFileService} from '../../../shared/services/font-json-file.service';
import {SearchByIdService} from '../../../shared/services/search-by-id.service';
import {LoaderPageSpinnerComponent} from '../../../global-components/loader/loader-page-spinner/loader-page-spinner.component';

@Component({
  selector: 'app-training-show',
  templateUrl: './training-show.component.html',
  styleUrls: ['./training-show.component.scss'],
  providers: [LoaderPageSpinnerComponent],
  animations: [fadingAwayAnimate]
})
export class TrainingShowComponent implements OnInit, OnDestroy {
  id: number;
  pdfBlockVisual: boolean;
  pdfFile;
  fonts = [];
  training: TrainingsShow;
  trainers: Trainers;
  loader: boolean;
  visibleTrainers = false;
  constructor(private idTraining: ActivatedRoute,
              private getReduxData: GetReduxDataService,
              private headerControl: MainLayoutComponent,
              private startingLoad: StartingLoadService,
              private loaderComponent: LoaderPageSpinnerComponent,
              private router: Router,
              private transferToId: SearchByIdService,
              private fontService: FontJsonFileService,
              private filePDFService: FilePdfService,
  ) {
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
    this.loader = true;
    this.loaderComponent.startLoaderPageSpinner();
    this.getFonts();
    this.idTraining.params.subscribe((params: Params) => {
      this.id = params.id;
      this.startingLoad.getOneTrainings(params.id).subscribe((oneTraining: TrainingsShow) => {
        if (oneTraining.pdf) {
          this.pdfBlockVisual = true;
        } else {
          this.pdfBlockVisual = false;
        }
        this.training = oneTraining;
        this.startingLoad.getSkillTrainerOneTrainer(params.id).subscribe((skill: Trainers) => {
          this.trainers = skill;
          if (Object.keys(this.trainers).length === 0) {
            this.visibleTrainers = false;
            console.log(Object.keys(this.trainers).length === 0);
          } else {
            this.visibleTrainers = true;
          }
        });
      });
    });
    this.loader = false;
    this.loaderComponent.stopLoaderPageSpinner();
  }
  getFonts() { // download fonts for editorConfig.
    this.fontService.getFontJsonFile().subscribe(result => {
      for (let i = 0; i < Object.keys(result).length; i++) {
        this.fonts[i] = result[i];
      }
    });
  }
  downloadPDF() { // метод который загружает pdf файл
    this.filePDFService.downloadPdq(this.id).subscribe((result) => {
      if (result) {
        this.pdfBlockVisual = true;
        this.pdfFile = window.URL.createObjectURL(result);
        window.open(this.pdfFile);
      } else {
        this.pdfBlockVisual = false;
      }
    });
  }
  transitionToOrder() {
    const training = [];
    training.push(this.trainers);
    if (training[0].length > 0) {
      const id = this.trainers[0].id;
      this.transferToId.getOrderTrainerId(id.toString());
      this.router.navigate(['trainings-order']);
    } else {
      // this.router.navigate(['trainings']);
      this.router.navigate(['trainings-order']);
    }
  }
  ngOnDestroy(): void {
    // show header on exit from the component
    this.headerControl.visibleHeaderComponent();
    this.headerControl.menuScrolling = false;
  }
}
