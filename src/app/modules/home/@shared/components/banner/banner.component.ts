import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent{

  constructor(private router: Router) {}

  goToSection() {
    this.router.navigate(['/men'], {queryParamsHandling: 'merge'}).then();
  }
}
