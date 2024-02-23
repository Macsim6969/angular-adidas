import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  constructor(private router: Router,
              private renderer: Renderer2,
              private el: ElementRef) {}

  ngOnInit(): void {
    this.adjustFontSize();
  }

  private adjustFontSize(): void {
    const baseFontSize = 16; // ваш базовый размер шрифта
    const windowWidth = window.innerWidth;
    const screenWidth = window.screen.width;

    const currentTextScale = windowWidth / screenWidth;

    const newFontSize = `${baseFontSize * currentTextScale}px`;
    document.body.style.fontSize = newFontSize;
  }


  goToSection() {
    this.router.navigate(['/men'], {queryParamsHandling: 'merge'})
  }
}
