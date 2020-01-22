import {AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {StartingLoadService} from '../shared/services/starting-load.service';
import {LoaderComponent} from '../global-components/loader/loader.component';
import {fadingAwayAnimate} from '../shared/animations/fading-away.animate';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [fadingAwayAnimate]
})
export class MainLayoutComponent implements OnInit, AfterContentChecked {
  loader: boolean;
  hiddenHeader: boolean; // переменная для скрытия header.
  menuScrolling: boolean; // переменная которая выполняется при скролле.
  btnTop: boolean;
  menuScroll: boolean;
  constructor(
    private cdRef: ChangeDetectorRef,
    private startLoad: StartingLoadService,
    private elRef: ElementRef,
    private loaderComponent: LoaderComponent,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.menuScrolling = false;
    this.hiddenHeader = false;
  }
  ngOnInit() {
    this.loader = false;
    this.loaderComponent.startSpinner();
    setTimeout(() => {
      this.startLoad.getPhotoStartPageGetAll();
      this.startLoad.getAllTrainers();
      this.startLoad.getFooterInfo();
      this.startLoad.getAllTrainings();
      this.startLoad.getWebinars();
      this.startLoad.getAllInscriptions();
      this.startLoad.getWebinarsInscription();
      this.loader = true;
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
  stickyMenu(scrollPosition) {
    setTimeout(() => {
      this.changeDetector.detectChanges();
      const menu = this.elRef.nativeElement.querySelector('app-menu').offsetTop;
      if (scrollPosition > menu) {
        this.menuScrolling = true;
      } else {
        this.menuScrolling = false;
      }
    });
  }
}
