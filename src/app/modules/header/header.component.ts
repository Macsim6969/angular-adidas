import {Component} from '@angular/core';
import {MatIconService} from "../../services/matIcon.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private matIcon: MatIconService,
              private router: Router) {}

  homeRoute(){
    this.router.navigate(['/'], {queryParamsHandling: 'merge'}).then();
  }

  public openBag() {
    this.router.navigate(['/bags'], {queryParamsHandling: 'merge'}).then()
  }

  public openFavourites() {
    this.router.navigate(['/favourites'], {queryParamsHandling: 'merge'}).then()
  }
}
