import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorClothesData, storeSelectorFavourites} from "../../../../../store/selectors/store.selectors";
import {ActivatedRoute, Params} from "@angular/router";
import {of, Subscription, take} from "rxjs";
import {ClothesContentService} from "../../../../../services/clothes-content.service";

@Component({
  selector: 'app-clothes-content',
  templateUrl: './clothes-content.component.html',
  styleUrl: './clothes-content.component.scss'
})
export class ClothesContentComponent implements OnInit, OnDestroy {
  public contentItem: any;
  public dataParam: string;

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

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

  private checkRouterParams() {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.clothesContentService._paramsPage = Object.keys(params)[0]
      const targetId = params['clothes'].split('_').map((word) => word.toUpperCase()).join(' ')
      this.getClothesDataFromStore(targetId, params)
    })
  }

  private getClothesDataFromStore(targetId: string, params: Params) {
    this.storeSubscription = this.store.select(storeSelectorClothesData).subscribe(data => {
        this.dataParam = params['menu']
        if (data[params['menu']] && data) {
          this.contentItem = data[params['menu']].find(data => data.name == targetId)
          this.contentItem.activeColor ? this.clothesContentService._choiceColorShoes = this.contentItem.activeColor : this.clothesContentService._choiceColorShoes = 0;
          this.contentItem?.activeSize ? this.setChangeActiveSizeClothes(this.contentItem.activeSize) : this.setChangeActiveSizeClothes(null);

          this.checkIsFavouriteData();
        }
      }
    )
  }

  private setChangeActiveSizeClothes(activeSize: any) {
    this.clothesContentService._activeSizeClothes = activeSize;
    this.clothesContentService._activeSizeShoes = activeSize;
  }

  private checkIsFavouriteData() {
    of(null).pipe(take(1)).subscribe(() => {
        this.storeSubscription = this.store.select(storeSelectorFavourites).subscribe((data) => {
          if (data) {
            this.clothesContentService._keysData = data;
            Object.values(data).find(clothes => {
                clothes.id === this.contentItem.id ? this.clothesContentService._isFavourite = true : this.clothesContentService._isFavourite = false;
              }
            )
          }
        })
    })
  }
}
