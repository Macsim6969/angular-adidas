import {Component, OnInit} from '@angular/core';
import {ProdsFromService} from "../../../../interfaces/home.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {storeSelectorFavourites} from "../../../../store/selectors/store.selectors";
import {of, take} from "rxjs";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../store/model/store.model";
import {AuthService} from "../../../../services/auth.service";
import {ClothesContentService} from "../../../../services/clothes-content.service";

@Component({
  selector: 'app-favourites-content',
  templateUrl: './favourites-content.component.html',
  styleUrl: './favourites-content.component.scss'
})
export class FavouritesContentComponent implements OnInit{
  public contentItem: ProdsFromService;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private authService: AuthService,
    private route: ActivatedRoute,
    private clothesContentService: ClothesContentService
  ) {}
  ngOnInit() {
    this.checkRouterParams();
  }

  private checkRouterParams() {
    this.route.params.subscribe((params: Params) => {
      console.log(params['clothes'])
      const targetId = params['clothes'].split('_').map((word) => word.toUpperCase()).join(' ')
      this.getClothesDataFromStore(targetId)
    })
  }

  private getClothesDataFromStore(targetId: string) {
    this.store.select(storeSelectorFavourites).subscribe((data: ProdsFromService[]) => {
      this.contentItem = Object.values(data).find((data: ProdsFromService) => data.name == targetId)
      if (this.contentItem?.activeColor) {
        this.clothesContentService._choiceColorShoes = this.contentItem.activeColor;
      }
      if (this.contentItem?.activeSize) {
        this.clothesContentService._activeSizeClothes = this.contentItem.activeSize;
        this.clothesContentService._activeSizeShoes = this.contentItem.activeSize;
      }

      of(null).pipe(take(1)).subscribe(() => {
        this.authService.user.pipe(take(1)).subscribe((user) => {
          this.store.select(storeSelectorFavourites).pipe(take(1)).subscribe((data: ProdsFromService[]) => {
            console.log(data)
            this.clothesContentService._keysData = data;

            Object.values(data).find((clothes: ProdsFromService) => {
              if (clothes.id === this.contentItem.id) {
                this.clothesContentService._isFavourite = true;
              } else {
                this.clothesContentService._isFavourite = false;
              }
            })
          })
        })
      })
    })
  }
}
