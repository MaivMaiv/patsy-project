import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutoSize]'
})
export class AutoSizeDirective implements AfterViewInit {
  @Input() maxFontSize: number = 20;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.adjustFontSize();
  }

  private adjustFontSize() {
    const container = this.el.nativeElement;
    const maxWidth = container.offsetWidth;
    const text = container.innerText.trim();

    let fontSize = this.maxFontSize;

    while (container.scrollWidth > maxWidth && fontSize > 1) {
      fontSize--;
      this.renderer.setStyle(container, 'font-size', `${fontSize}px`);
    }
  }
}
