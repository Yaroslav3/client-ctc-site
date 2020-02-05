import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {GetReduxDataService} from '../../../shared/services/get-redux-data.service';
import {Webinars} from '../../../shared/model/Webinars.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {MainLayoutComponent} from '../../../main-layout/main-layout.component';
import {fadingAwayAnimate} from '../../../shared/animations/fading-away.animate';
import {SearchByIdService} from '../../../shared/services/search-by-id.service';
import {LoaderPageSpinnerComponent} from '../../../global-components/loader/loader-page-spinner/loader-page-spinner.component';

@Component({
  selector: 'app-webinar-show',
  templateUrl: './webinar-show.component.html',
  styleUrls: ['./webinar-show.component.scss'],
  providers:[LoaderPageSpinnerComponent],
  animations: [fadingAwayAnimate]
})
export class WebinarShowComponent implements OnInit, AfterContentChecked, OnDestroy {
  loader: boolean;
  webinar: Webinars;
  idWebinar: number;
  count = 0;
  webinarCountStatuses;
  editorConfig: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
    height: 'auto',
    defaultFontSize: '5',
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
  constructor(
    private getReduxData: GetReduxDataService,
    private headerControl: MainLayoutComponent,
    private loaderComponent: LoaderPageSpinnerComponent,
    private route: Router,
    private searchId: SearchByIdService,
    private router: ActivatedRoute) {
    this.headerControl.hiddenHeaderComponent();
    this.loader = true;
  }
  ngOnInit() {
    this.loaderComponent.startLoaderPageSpinner();
    setTimeout(() => {
      this.startPage();
      this.loader = false;
      this.loaderComponent.stopLoaderPageSpinner();
    }, 700);
  }
  ngAfterContentChecked() {
  }
  startPage() {
    this.router.params.subscribe((params: Params) => {
      this.idWebinar = params.id;
      this.webinar = this.getReduxData.getOneWebinars(params.id);
      this.webinarCountStatuses = this.webinar.webinarCountStatuses;
      this.count = Object.keys(this.webinarCountStatuses).length;
    });
  }
  order() {
    this.searchId.getWebinarId(this.idWebinar);
    this.route.navigate(['webinars/webinar-order-form']);
  }
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
    this.headerControl.menuScrolling = false;
    this.loaderComponent.stopLoaderPageSpinner();
  }
}

