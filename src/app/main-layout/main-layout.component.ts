import {AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {StartingLoadService} from '../shared/services/starting-load.service';
import {fadingAwayAnimate} from '../shared/animations/fading-away.animate';
import {LoaderStartAppComponent} from '../global-components/loader/loader-start-app/loader-start-app.component';
import {RoomDateService} from '../shared/services/room-date.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [fadingAwayAnimate],
  providers: [LoaderStartAppComponent]
})
export class MainLayoutComponent implements OnInit, AfterContentChecked {
  loader: boolean;
  hiddenHeader: boolean; // переменная для скрытия header.
  menuScrolling: boolean; // переменная которая выполняется при скролле.
  btnTop: boolean;
  scrollPosition: number;
  constructor(
    private cdRef: ChangeDetectorRef,
    private startLoad: StartingLoadService,
    private roomDate: RoomDateService,
    private elRef: ElementRef,
    private loaderComponent: LoaderStartAppComponent,
  ) {
    this.menuScrolling = false;
    this.hiddenHeader = false;
  }
  ngOnInit() {
    this.loader = true;
    this.loaderComponent.startSpinner();
    setTimeout(() => {
      this.startLoad.getPhotoStartPageGetAll();
      this.startLoad.getAllTrainers();
      this.startLoad.getFooterInfo();
      this.startLoad.getAllTrainings();
      this.startLoad.getWebinars();
      this.startLoad.getAllInscriptions();
      this.startLoad.getWebinarsInscription();
      this.roomDate.getAllRoom();
      this.loader = false;
      this.loaderComponent.stopSpinner();
    }, 1000);
  }
  hiddenHeaderComponent() {
    this.hiddenHeader = true;
  }
  visibleHeaderComponent() {
    this.hiddenHeader = false;
  }
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }
  scrollEvent(scrollPosition: number) {
    this.scrollPosition = scrollPosition;
    if (this.hiddenHeader) {
      if (scrollPosition > 1) {
        this.menuScrolling = true;
      } else {
        this.menuScrolling = false;
      }
    }
    if (scrollPosition > 100) {
      this.btnTop = true;
    } else {
      this.btnTop = false;
    }
  }
  buttonTop() {
    window.scroll(0, 0);
  }

  // stickyMenu(scrollPosition) {
  //   const menu = this.elRef.nativeElement.querySelector('app-menu').offsetTop - 30;
  //   if (scrollPosition > menu) {
  //     this.menuScrolling = true;
  //   } else {
  //     this.menuScrolling = false;
  //   }
  // }
}
