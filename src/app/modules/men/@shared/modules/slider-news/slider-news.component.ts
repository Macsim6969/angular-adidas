import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {DragScrollComponent} from "ngx-drag-scroll";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../store/model/store.model";
import {storeSelectorClothesData} from "../../../../../store/selectors/store.selectors";
import {ProdsFromService} from "../../../../../interfaces/home.interface";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-slider-news',
  templateUrl: './slider-news.component.html',
  styleUrl: './slider-news.component.scss'
})
export class SliderNewsComponent implements OnInit, OnDestroy {
  @ViewChildren('nav', {read: DragScrollComponent}) dragScroll: DragScrollComponent
  public newsList: any[];
  private storeSubscription: Subscription;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.initializeValentinesDataFromStore();
    this.translate.use('en')
  }

  private initializeValentinesDataFromStore(){
   this.storeSubscription = this.store.select(storeSelectorClothesData).subscribe((data: ProdsFromService[]) => {
      this.newsList = data['valentines'];
    })
  }

 public openNewCollection(id: string) {
    const newRoute = id.replace(/ /g, '_').toLowerCase();
    const newRouterLink = 'men/valentines/' + newRoute;
    this.router.navigate([newRouterLink], {queryParamsHandling: 'merge'}).then();
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
