import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProdsFromService} from "../../../../interfaces/home.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {storeSelectorFavourites} from "../../../../store/selectors/store.selectors";
import {of, Subscription, take} from "rxjs";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../store/model/store.model";
import {ClothesContentService} from "../../../../services/clothes-content.service";

@Component({
  selector: 'app-favourites-content',
  templateUrl: './favourites-content.component.html',
  styleUrl: './favourites-content.component.scss'
})
export class FavouritesContentComponent implements OnInit, OnDestroy {
  public contentItem: ProdsFromService;

  private routeSubscription: Subscription;
  private storeSubscription: Subscription;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute,
    private clothesContentService: ClothesContentService
  ) {
  }

  ngOnInit() {
    this.checkRouterParams();
  }

  private checkRouterParams() {
   this.routeSubscription = this.route.params.subscribe((params: Params) => {

      this.clothesContentService._paramsPage = Object.keys(params)[0]
      const targetId = params['products']?.split('_').map((word) => word.toUpperCase()).join(' ')
      this.getClothesDataFromStore(targetId)
    })
  }

  private getClothesDataFromStore(targetId: string) {
    this.storeSubscription = this.store.select(storeSelectorFavourites).subscribe((data: ProdsFromService[]) => {
      if (data) {
        this.contentItem = Object.values(data).find((data: ProdsFromService) => data.name == targetId)
        if (this.contentItem?.activeColor) {
          this.clothesContentService._choiceColorShoes = this.contentItem.activeColor;
        } else {
          this.clothesContentService._choiceColorShoes = 0;
        }

        this.contentItem?.activeSize ? this.setChangeActiveSizeClothes(this.contentItem.activeSize) : this.setChangeActiveSizeClothes(null);
        this.checkIsFavouriteData();
      }
    })
  }

  private setChangeActiveSizeClothes(activeSize: any) {
    this.clothesContentService._activeSizeClothes = activeSize;
    this.clothesContentService._activeSizeShoes = activeSize;
  }

  private checkIsFavouriteData() {
    of(null).pipe(take(1)).subscribe(() => {
        this.storeSubscription = this.store.select(storeSelectorFavourites).subscribe((data: ProdsFromService[]) => {
          this.clothesContentService._keysData = data;
          Object.values(data).find((clothes: ProdsFromService) => {
            clothes.id === this.contentItem?.id ? this.clothesContentService._isFavourite = true :
              this.clothesContentService._isFavourite = false;
          })
        })

    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }
}
