import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProdsFromService} from "../../../../interfaces/home.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {storeSelectorFavourites} from "../../../../store/selectors/store.selectors";
import {of, Subscription, take} from "rxjs";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../store/model/store.model";
import {AuthService} from "../../../../services/auth.service";
import {ClothesContentService} from "../../../../services/clothes-content.service";

@Component({
  selector: 'app-favourites-content',
  templateUrl: './favourites-content.component.html',
  styleUrl: './favourites-content.component.scss'
})
export class FavouritesContentComponent implements OnInit, OnDestroy {
  public contentItem: ProdsFromService;
  private paramsSubscription: Subscription;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private clothesContentService: ClothesContentService
  ) {
  }

  ngOnInit() {
    this.checkRouterParams();
  }

  ngOnDestroy() {
  }

  private checkRouterParams() {
    this.route.params.subscribe((params: Params) => {
      this.clothesContentService._paramsPage = Object.keys(params)[0]
      const targetId = params['products']?.split('_').map((word) => word.toUpperCase()).join(' ')
      this.getClothesDataFromStore(targetId)
    })
  }

  private getClothesDataFromStore(targetId: string) {
    this.store.select(storeSelectorFavourites).subscribe((data: ProdsFromService[]) => {
      !data ? this.router.navigate(['favourites'], {queryParamsHandling: 'merge'}).then() : null;
      if (data) {
        this.contentItem = Object.values(data).find((data: ProdsFromService) => data.name == targetId)
        if (this.contentItem?.activeColor) {
          this.clothesContentService._choiceColorShoes = this.contentItem.activeColor;
        } else {
          this.clothesContentService._choiceColorShoes = 0;
        }
        if (this.contentItem?.activeSize) {
          this.clothesContentService._activeSizeClothes = this.contentItem.activeSize;
          this.clothesContentService._activeSizeShoes = this.contentItem.activeSize;
        } else {
          this.clothesContentService._activeSizeClothes = null;
          this.clothesContentService._activeSizeShoes = null;
        }

        of(null).pipe(take(1)).subscribe(() => {
          this.authService.user.pipe(take(1)).subscribe((user) => {
            this.store.select(storeSelectorFavourites).pipe(take(1)).subscribe((data: ProdsFromService[]) => {
              this.clothesContentService._keysData = data;

              Object.values(data).find((clothes: ProdsFromService) => {
                clothes.id === this.contentItem?.id ? this.clothesContentService._isFavourite = true :
                  this.clothesContentService._isFavourite = false;

              })
            })
          })
        })
      }
    })
  }
}
