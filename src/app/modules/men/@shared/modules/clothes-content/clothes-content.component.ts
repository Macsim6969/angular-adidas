import {Component, OnInit} from '@angular/core';
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {
  storeSelectorClothesData, storeSelectorFavourites
} from "../../../../../store/selectors/store.selectors";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../../../../services/auth.service";
import {of, take} from "rxjs";
import {ClothesContentService} from "../../../../../services/clothes-content.service";

@Component({
  selector: 'app-clothes-content',
  templateUrl: './clothes-content.component.html',
  styleUrl: './clothes-content.component.scss'
})
export class ClothesContentComponent implements OnInit {
  public contentItem: any;
  public dataParam: string;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute,
    private authService: AuthService,
    private clothesContentService: ClothesContentService
  ) {
  }

  ngOnInit() {
    this.checkRouterParams();

  }

  private checkRouterParams() {
    this.route.params.subscribe((params: Params) => {
      console.log(params)
      const targetId = params['clothes'].split('_').map((word) => word.toUpperCase()).join(' ')
      this.getClothesDataFromStore(targetId,params)
    })
  }

  private getClothesDataFromStore(targetId: string, params: Params) {
    this.store.select(storeSelectorClothesData).subscribe(data => {
      this.dataParam = params['menu']
      if (data[params['menu']]) {
        this.contentItem = data[params['menu']].find(data => data.name == targetId)
        console.log(this.contentItem);
        if (this.contentItem?.activeColor) {
          this.clothesContentService._choiceColorShoes = this.contentItem.activeColor;
        }
        if (this.contentItem?.activeSize) {
          this.clothesContentService._activeSizeClothes = this.contentItem.activeSize;
          this.clothesContentService._activeSizeShoes = this.contentItem.activeSize;
        }

        of(null).pipe(take(1)).subscribe(() => {
          this.authService.user.pipe(take(1)).subscribe((user) => {
            this.store.select(storeSelectorFavourites).pipe(take(1)).subscribe((data) => {
              this.clothesContentService._keysData = data;
              Object.values(data).find(clothes => {
                if (clothes.id === this.contentItem.id) {
                  this.clothesContentService._isFavourite = true;
                } else {
                  this.clothesContentService._isFavourite = false;
                }
              })
            })
          })
        })
      }
    })
  }
}
