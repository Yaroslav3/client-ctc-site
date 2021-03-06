import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Room} from '../../../shared/model/Room.model';
import {GetReduxDataService} from '../../../shared/services/get-redux-data.service';
import {MainLayoutComponent} from '../../../main-layout/main-layout.component';
import {RoomDateService} from '../../../shared/services/room-date.service';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {fadingAwayAnimate, showAnimate} from '../../../shared/animations/fading-away.animate';
import {FontJsonFileService} from '../../../shared/services/font-json-file.service';

@Component({
  selector: 'app-show-room-info',
  templateUrl: './show-room-info.component.html',
  styleUrls: ['./show-room-info.component.scss'],
  animations: [showAnimate, fadingAwayAnimate],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ShowRoomInfoComponent implements OnInit, OnDestroy {
  id: number;
  room: Room;
  showHour = true;
  showDay = false;
  fonts = [];
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
  constructor(private route: ActivatedRoute,
              private router: Router,
              private headerControl: MainLayoutComponent,
              private roomDate: RoomDateService,
              private elRef: ElementRef,
              private fontService: FontJsonFileService,
              private getReduxDat: GetReduxDataService) {
    this.headerControl.hiddenHeaderComponent();
  }
  ngOnInit() {
    this.getFonts();
    this.route.params.subscribe((param: Params) => {
      this.room = this.getReduxDat.getOneRoomState(param.id);
      this.id = param.id;
      if (!this.room) {
        this.router.navigate(['/room-rental']);
      }
    });
  }
  getFonts() { // download fonts for editorConfig.
    this.fontService.getFontJsonFile().subscribe(result => {
      for (let i = 0; i < Object.keys(result).length; i++) {
        this.fonts[i] = result[i];
      }
    });
  }
  showChoiceOfDays() {
    this.showDay = true;
    this.showHour = false;
  }
  showHourlySelection() {
    this.showDay = false;
    this.showHour = true;
  }
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
    window.scroll(0, 0);
  }
}
