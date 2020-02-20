import {ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {fadingAwayAnimate, showAnimate} from '../../shared/animations/fading-away.animate';
import {animate, AnimationBuilder, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: []
})
export class SliderComponent implements OnInit {
  numberImg = 0;
  id = 0;
  allPhoto;
  pictureImg: any;
  hidden = true;
  @Input() photo;
  @Input() width;
  @Input() height;
  @ViewChild('img', {static: false}) sliderImg: ElementRef;
  @ViewChild('controlСursor', {static: false}) controlСursor: ElementRef;
  constructor(private renderer: Renderer2,
              private elRef: ElementRef,
              private changeDetector: ChangeDetectorRef,
              public builder: AnimationBuilder) {
  }
  animate() {
    const factory = this.builder.build([
      animate('1s', keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 0.5, offset: 0.5}),
        style({opacity: 1, offset: 1})
      ]))
    ]);
    const player = factory.create(this.sliderImg.nativeElement);
    player.play();
  }
  ngOnInit() {
    console.log(this.photo);
    this.allPhoto = this.photo.map(p => p.photo);
    this.pictureImg = this.allPhoto[this.numberImg = 0];
    this.addControlVisualisation(this.id);
    if (this.photo.length <= 1) {
      this.hidden = false;
    }
  }
  next() {
    this.deleteControlVisualisation(this.id);
    if (this.pictureImg === this.allPhoto[this.allPhoto.length - 1]) {
      this.pictureImg = this.allPhoto[0];
      this.numberImg = 0;
      this.id = 0;
      this.addControlVisualisation(this.id);
      this.animate();
    } else {
      this.id++;
      this.numberImg++;
      this.pictureImg = this.allPhoto[this.numberImg];
      this.addControlVisualisation(this.id);
      this.animate();
    }
  }
  prev() {
    this.deleteControlVisualisation(this.id);
    if (this.pictureImg === this.allPhoto[0]) {
      this.pictureImg = this.allPhoto[this.allPhoto.length - 1];
      this.numberImg = this.allPhoto.length - 1;
      this.id = this.allPhoto.length - 1;
      this.addControlVisualisation(this.id);
      this.animate();
    } else {
      this.id--;
      this.numberImg--;
      this.pictureImg = this.allPhoto[this.numberImg];
      this.addControlVisualisation(this.id);
      this.animate();
    }
  }
  addControlVisualisation(id: any) {
    setTimeout(() => {
      this.changeDetector.detectChanges();
      const cursor = this.controlСursor.nativeElement.getElementsByClassName('item');
      const bb = cursor.namedItem(id);
      this.renderer.addClass(bb, 'active-control');
    });
  }
  deleteControlVisualisation(id: any) {
    setTimeout(() => {
      this.changeDetector.detectChanges();
      const cursor = this.controlСursor.nativeElement.getElementsByClassName('item');
      const bb = cursor.namedItem(id);
      this.renderer.removeClass(bb, 'active-control');
    });
  }
}
