import {Component, OnInit} from '@angular/core';
import {InfoPopupService} from "../../../services/info-popup.service";
import {Observable, timer} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrl: './info-popup.component.scss'
})
export class InfoPopupComponent implements OnInit {
  image$: Observable<string>
  title$: Observable<string>
  isActive: boolean;

  constructor(
    private infoPopup: InfoPopupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.image$ = this.infoPopup._favouriteClotheImage$;
    this.title$ = this.infoPopup._favoriteClotheTitle$;

    this.image$.subscribe((data: string) => {
      if(data){
        this.isActive = true;
      }

      this.isActive ? timer(4000).subscribe(() =>{
        this.isActive = false
      }): null
    })



  }

  public openFavourites(){
    this.router.navigate(['/favourites'], {queryParamsHandling: 'merge'}).then();
  }
}
