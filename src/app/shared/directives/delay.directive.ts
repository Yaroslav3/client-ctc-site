import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Template} from '@angular/compiler/src/render3/r3_ast';

@Directive({
  selector: '[appDelay]'
})
export class DelayDirective implements OnInit {
  @Input() delay: number;

  constructor(private view: ViewContainerRef,
              private template: TemplateRef<ElementRef>) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.view.createEmbeddedView(this.template);
    }, this.delay);
  }


}
