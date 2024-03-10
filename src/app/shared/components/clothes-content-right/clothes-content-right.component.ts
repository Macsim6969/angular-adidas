import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconService} from "../../../services/matIcon.service";
import {map, Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {StateMenService} from "../../../services/state-men.service";
import {InfoPopupService} from "../../../services/info-popup.service";
import {ProdsFromService} from "../../../interfaces/home.interface";
import {ClothesContentService} from "../../../services/clothes-content.service";
import {StoreInterface} from "../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorFavourites} from "../../../store/selectors/store.selectors";

@Component({
  selector: 'app-clothes-content-right',
  templateUrl: './clothes-content-right.component.html',
  styleUrl: './clothes-content-right.component.scss'
})
export class ClothesContentRightComponent implements OnInit, OnDestroy {
  @Input() public contentItem: any;
  public sizesShoes: number[] = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
  public sizesClothes: string[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
  public choiceColorShoes: number = 0;

  public activeSizeShoes: number;
  public activeSizeClothes: string;
  public isFavourite: boolean = false;
  public keysData: ProdsFromService[];

  private isFavouriteSubscription: Subscription;
  private keysDataSubscription: Subscription;
  private activeSizeShoesSubscription: Subscription;
  private activeSizeClothesSubscription: Subscription;
  private choiceColorShoesSubscription: Subscription;

  constructor(
    private matIcon: MatIconService,
    private authService: AuthService,
    private stateMenService: StateMenService,
    private infoPopup: InfoPopupService,
    private clothesContentService: ClothesContentService,
    private store: Store<{ store: StoreInterface }>
  ) {
  }

  ngOnInit() {
    this.streamIsFavouriteData();
    this.streamChoiceColorShoes();
    this.streamIsKeyData();
    this.streamActiveSizeShoes();
    this.streamActiveSizeClothes();
  }

  public choiceColor(index: number) {
    this.choiceColorShoes = index;
    this.clothesContentService._choiceColorShoes = index
  }

  public choiceSize(size: number | string) {
    typeof size === 'number' ? this.activeSizeShoes = size : this.activeSizeClothes = size;
  }

  public addBag() {

  }

  public like() {
    let activeSize: number | string;
    if (typeof this.contentItem.sizes === 'number') {
      activeSize = this.activeSizeShoes;
    } else {
      activeSize = this.activeSizeClothes;
    }

    const dopInfo = {
      activeColor: this.choiceColorShoes,
      activeSize: activeSize,
      favouriteClothes: true
    }

    const newId = {
      ...this.contentItem, ...dopInfo
    }

    if (this.authService.user.pipe(map((user) => !!user))) {
      this.authService.user.subscribe((user) => {
        this.stateMenService.addFavouritesClothes(user.id, newId).add(() => {
          this.stateMenService.getFavouritesClothes(user.id);
          this.infoPopup._favouriteClotheImage = newId.imageURL[this.choiceColorShoes];
          this.infoPopup._favoriteClotheTitle = newId.name;
        })
      })
    }
    this.isFavourite = true;
  }

  unlike(id: number) {
    if (this.authService.user.pipe(map((user) => !!user)) && this.keysData) {
      this.authService.user.subscribe((user) => {
        const entries = Object.entries(this.keysData);
        const foundEntry = entries.find(([key, value]) => value.id === id);

        if (foundEntry) {
          const [key, value] = foundEntry;
          const objectKeyToRemove = key;
          this.stateMenService.removeFavouriteClothes(user.id, objectKeyToRemove);
          this.infoPopup._favouriteClotheImage = this.infoPopup._favouriteClotheImage$.getValue();
          this.infoPopup._favoriteClotheTitle = this.infoPopup._favoriteClotheTitle$.getValue();
          this.isFavourite = false;
        }
      })
    }
  }

  ngOnDestroy() {
    this.isFavouriteSubscription.unsubscribe();
    this.keysDataSubscription.unsubscribe();
    this.activeSizeShoesSubscription.unsubscribe();
    this.activeSizeClothesSubscription.unsubscribe();
    this.choiceColorShoesSubscription.unsubscribe();
  }

  private streamIsFavouriteData() {
    this.isFavouriteSubscription = this.store.select(storeSelectorFavourites).subscribe(data => {
      if (data && Object.values(data).find((data: ProdsFromService) => data.id === this.contentItem.id)?.favouriteClothes) {
        this.isFavourite = Object.values(data).find((data: ProdsFromService) => data.id === this.contentItem.id)?.favouriteClothes
      } else {
        this.isFavourite = false;
      }
    })
  };

  private streamChoiceColorShoes() {
    this.choiceColorShoesSubscription = this.clothesContentService._choiceColorShoes$.subscribe((data: number) => {
      this.choiceColorShoes = data;
    });
  };

  private streamIsKeyData() {
    this.keysDataSubscription = this.clothesContentService._keysData$.subscribe((data: ProdsFromService[]) => {
      console.log(this.keysData, 'key-Data');
      this.keysData = data;
    });
  };

  private streamActiveSizeShoes() {
    this.activeSizeShoesSubscription = this.clothesContentService._activeSizeShoes$.subscribe((data: number) => {
      this.activeSizeShoes = data;
    });
  };

  private streamActiveSizeClothes() {
    this.activeSizeClothesSubscription = this.clothesContentService._activeSizeClothes$.subscribe((data: string) => {
      this.activeSizeClothes = data;
    });
  };


}
