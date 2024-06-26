import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconService} from "../../../services/matIcon.service";
import {map, Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {StateMenService} from "../../../services/state-men.service";
import {InfoPopupService} from "../../../services/info-popup.service";
import {Popup, ProdsFromService} from "../../../interfaces/home.interface";
import {ClothesContentService} from "../../../services/clothes-content.service";
import {StoreInterface} from "../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorFavourites, storeSelectorLang} from "../../../store/selectors/store.selectors";
import {Router} from "@angular/router";
import {User} from "../../../modules/auth/auth.model";
import {Bags} from "../../../interfaces/bags.interface";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-clothes-content-right',
  templateUrl: './clothes-content-right.component.html',
  styleUrl: './clothes-content-right.component.scss'
})
export class ClothesContentRightComponent implements OnInit, OnDestroy {
  @Input() public contentItem: any;
  private destroy$: Subject<void> = new Subject<void>();
  public sizesShoes: number[] = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
  public sizesClothes: string[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
  public choiceColorShoes: number = 0;
  public activeSizeShoes: number;
  public activeSizeClothes: string;
  public isFavourite: boolean = false;
  public keysData: ProdsFromService[];
  public isSizeActive: boolean;
  public isLoading: boolean;
  private user: User;

  private addToBag: string;
  private addToFavourites: string;
  private removeFromFavourites: string;

  constructor(
    private matIcon: MatIconService,
    private authService: AuthService,
    private stateMenService: StateMenService,
    private router: Router,
    private infoPopup: InfoPopupService,
    private clothesContentService: ClothesContentService,
    private store: Store<{ store: StoreInterface }>,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.streamTranslateLang();
    this.streamIsFavouriteData();
    this.streamChoiceColorShoes();
    this.streamIsKeyData();
    this.streamActiveSizeShoes();
    this.streamActiveSizeClothes();
    this.authService.user.subscribe((user) => {
      this.user = user;
    })
  }

  private streamPopupDataFromJson(){
    this.translate.stream('popup').subscribe((data: Popup) =>{
      this.addToBag = data.addToBags;
      this.addToFavourites = data.addToFavourite;
      this.removeFromFavourites = data.removeFromFavourites;

    })
  }

  private streamTranslateLang(){
    this.store.select(storeSelectorLang).subscribe((lang) =>{
      this.translate.use(lang);
    })
  }

  public choiceColor(index: number) {
    this.choiceColorShoes = index;
    this.clothesContentService._choiceColorShoes = index
  }

  public choiceSize(size: number | string) {
    this.isSizeActive = true;
    typeof size === 'number' ? this.activeSizeShoes = size : this.activeSizeClothes = size;
  }

  public addBag() {
    this.isLoading = true
    let activeSize: number | string;
    if (typeof this.contentItem.sizes === 'number') {
      activeSize = this.activeSizeShoes;
    } else {
      activeSize = this.activeSizeClothes;
    }
    const clothes: Bags = {
      id: this.contentItem.id,
      name: this.contentItem.name,
      price: this.contentItem.price,
      activeSize: activeSize,
      color: this.contentItem.galleryDop[this.choiceColorShoes].info[1],

    }

    this.stateMenService.addClothesToBags(this.user.id, clothes).add(() =>{
      this.infoPopup._favouriteClotheImage =this.contentItem.imageURL[this.choiceColorShoes];
      this.infoPopup._favoriteClotheTitle = this.contentItem.name;
      this.infoPopup._descriptionTitle = this.addToBag;
      this.infoPopup._routerForPopup = 'bags'
      this.isLoading = false;

    })
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
      this.stateMenService.addFavouritesClothes(this.user.id, newId).add(() => {
        this.stateMenService.getFavouritesClothes(this.user.id);
        this.infoPopup._favouriteClotheImage = newId.imageURL[this.choiceColorShoes];
        this.infoPopup._favoriteClotheTitle = newId.name;
        this.infoPopup._descriptionTitle = this.addToFavourites;
        this.infoPopup._routerForPopup = 'favourites';
      })

    }
    this.isFavourite = true;
  }

  unlike(id: number) {
    if (this.authService.user.pipe(map((user) => !!user)) && this.keysData) {

      const entries = Object.entries(this.keysData);
      const foundEntry = entries.find(([key, value]) => value.id === id);

      if (foundEntry) {
        const [key, value] = foundEntry;
        const objectKeyToRemove = key;
        this.stateMenService._params = this.router.url.indexOf('?') !== -1 ? this.router.url.substring(1, this.router.url.indexOf('?')) : null;
        this.stateMenService.removeFavouriteClothes(this.user.id, objectKeyToRemove);
        this.infoPopup._favouriteClotheImage = this.infoPopup._favouriteClotheImage$.getValue();
        this.infoPopup._favoriteClotheTitle = this.infoPopup._favoriteClotheTitle$.getValue();
        this.infoPopup._descriptionTitle = this.removeFromFavourites;
        this.infoPopup._routerForPopup = 'favourites';
        this.isFavourite = false;
      }
    }
  }

  private streamIsFavouriteData() {
    this.store.select(storeSelectorFavourites).pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data && Object.values(data).find((data: ProdsFromService) => data.id === this.contentItem.id)?.favouriteClothes) {
        this.isFavourite = Object.values(data).find((data: ProdsFromService) => data.id === this.contentItem.id)?.favouriteClothes
      } else {
        this.isFavourite = false;
      }
    })
  };

  private streamChoiceColorShoes() {
   this.clothesContentService._choiceColorShoes$.pipe(takeUntil(this.destroy$)).subscribe((data: number) => {
      this.choiceColorShoes = data;
    });
  };

  private streamIsKeyData() {
    this.clothesContentService._keysData$.pipe(takeUntil(this.destroy$)).subscribe((data: ProdsFromService[]) => {
      this.keysData = data;
    });
  };

  private streamActiveSizeShoes() {
    this.clothesContentService._activeSizeShoes$.pipe(takeUntil(this.destroy$)).subscribe((data: number) => {
      this.activeSizeShoes = data;
    });
  };

  private streamActiveSizeClothes() {
    this.clothesContentService._activeSizeClothes$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      this.activeSizeClothes = data;
    });
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
