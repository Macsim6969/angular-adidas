import {Component, OnDestroy, OnInit} from '@angular/core';
import {InfoPopupService} from "../../../services/info-popup.service";
import {Observable, Subscription, take, timer} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrl: './info-popup.component.scss'
})
export class InfoPopupComponent implements OnInit, OnDestroy {
  public image$: Observable<string>;
  public title$: Observable<string>;
  public description$: Observable<string>;
  public isActive: boolean;
  private imageSubscription: Subscription;
  constructor(
    private infoPopup: InfoPopupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeStartObservableData();
    this.streamImageObservableData();
  }

  private initializeStartObservableData(){
    this.image$ = this.infoPopup._favouriteClotheImage$;
    this.title$ = this.infoPopup._favoriteClotheTitle$;
    this.description$ = this.infoPopup._descriptionTitle$;
  }

  private streamImageObservableData(){
    this.imageSubscription = this.image$.subscribe((data: string) => {
      data ? this.isActive = true : null;

      this.isActive ? timer(4000).pipe(take(1)).subscribe(() =>{
        this.isActive = false
      }): null
    })
  }

  public openFavourites(){
    this.router.navigate([this.infoPopup._routerForPopup$.getValue()], {queryParamsHandling: 'merge'}).then();
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
  }
}
