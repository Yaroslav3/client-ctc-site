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
import {FilePdfService} from '../../../shared/services/file-pdf.service';
import {FontJsonFileService} from '../../../shared/services/font-json-file.service';
import {SearchByIdService} from '../../../shared/services/search-by-id.service';

@Component({
  selector: 'app-training-show',
  templateUrl: './training-show.component.html',
  styleUrls: ['./training-show.component.scss'],
  animations: [fadingAwayAnimate]
})
export class TrainingShowComponent implements OnInit, AfterContentChecked, OnDestroy {
  id: number;
  fonts = [];
  selectFile: File = null;
  training: TrainingsShow;
  trainers: Trainers;
  loader: boolean;
  constructor(private idTraining: ActivatedRoute,
              private getReduxData: GetReduxDataService,
              private headerControl: MainLayoutComponent,
              private startingLoad: StartingLoadService,
              private loaderComponent: LoaderComponent,
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
      this.startingLoad.getOneTrainings(params.id).subscribe((oneTraining: TrainingsShow) => {
        this.training = oneTraining;
        this.startingLoad.getSkillTrainerOneTrainer(params.id).subscribe((skill: Trainers) => {
          this.trainers = skill;
        });
      });
    });
    this.loader = false;
    this.loaderComponent.stopLoaderPageSpinner();
  }
  ngAfterContentChecked(): void {
    this.idTraining.params.subscribe((params: Params) => {
      // this.training = this.getReduxData.getOneTraining(params.id);
    });
  }
  getFonts() { // download fonts for editorConfig.
    this.fontService.getFontJsonFile().subscribe(result => {
      for (let i = 0; i < Object.keys(result).length; i++) {
        this.fonts[i] = result[i];
      }
    });
  }
  downloadPDF() {
    console.log('download pdf ....');
    this.filePDFService.downloadPdq(this.id).subscribe((result) => {
      // this.selectFile = result;
      const url = window.URL.createObjectURL(result);
      console.log(url);
      window.open(url);
      console.log('download result ', result);
      // const file = new Blob([res], {type: 'application/pdf'});
      // const fileURL = URL.revokeObjectURL(file.type);
      //
      // console.log(file);
      // window.open(fileURL);
      // const doc = new jsPDF();
      // this.pouter.navigate([fileURL]);
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
  }
}
