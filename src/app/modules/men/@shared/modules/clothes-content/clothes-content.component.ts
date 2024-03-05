import {Component, OnInit} from '@angular/core';
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {
  storeSelectorClothesData, storeSelectorFavourites
} from "../../../../../store/selectors/store.selectors";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatIconService} from "../../../../../services/matIcon.service";
import {AuthService} from "../../../../../services/auth.service";
import {map, of, take} from "rxjs";
import {StateMenService} from "../../../../../services/state-men.service";
import {ProdsFromService} from "../../../../../interfaces/home.interface";

@Component({
  selector: 'app-clothes-content',
  templateUrl: './clothes-content.component.html',
  styleUrl: './clothes-content.component.scss'
})
export class ClothesContentComponent implements OnInit {
  public contentItem: any;
  public choiceColorShoes: number = 0;
  public isMorePhoto: boolean = false;
  public isFavourite: boolean = false;

  public sizesShoes: number[] = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]

  public sizesClothes: string[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']

  titleActive: 'Descriptions' | 'Details'
  public titleContentLeft: ['Descriptions', 'Details'] = ['Descriptions', 'Details']
  public tabsActive: number = -1;
  public dataParam: string;
  public keysData: ProdsFromService[];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute,
    private matIcon: MatIconService,
    private router: Router,
    private authService: AuthService,
    private stateMenService: StateMenService
  ) {
  }

  ngOnInit() {
    this.checkRouterParams();

  }

  public backRoute() {
    this.router.navigate(['/men/' + this.dataParam], {queryParamsHandling: 'merge'}).then();
  }

  public choiceColor(index: number) {
    this.choiceColorShoes = index;
  }

  public handleTabs(string: 'Details' | 'Descriptions', index: number) {
    this.titleActive = string;
    this.tabsActive = index;
  }

  public like() {
    if (this.authService.user.pipe(map((user) => !!user))) {
      this.authService.user.subscribe((user) => {
        this.stateMenService.addFavouritesClothes(user.id, this.contentItem).add(() =>{
          this.stateMenService.getFavouritesClothes(user.id);
        })
      })
    }
    this.isFavourite = true;
  }

  unlike(id: number) {
    console.log(id)
    if (this.authService.user.pipe(map((user) => !!user))) {
      this.authService.user.subscribe((user) => {
        const entries = Object.entries(this.keysData);

        const foundEntry = entries.find(([key, value]) => value.id === id);

        if (foundEntry) {
          const [key, value] = foundEntry;
          const objectKeyToRemove = key;
          this.stateMenService.removeFavouriteClothes(user.id, objectKeyToRemove)
          this.isFavourite = false;
        }

      })
    }
  }

  private checkRouterParams() {
    this.route.params.subscribe((params: Params) => {
      const targetId = params['clothes'].split('_').map((word) => word.toUpperCase()).join(' ')
      this.getClothesDataFromStore(targetId, params)
    })
  }

  private getClothesDataFromStore(targetId: string, params: Params) {
    this.store.select(storeSelectorClothesData).subscribe(data => {
      this.dataParam = params['menu']
      if (data[params['menu']]) {
        this.contentItem = data[params['menu']].find(data => data.name == targetId)

        of(null).pipe(take(1)).subscribe(() => {
          this.authService.user.pipe(take(1)).subscribe((user) => {
            this.store.select(storeSelectorFavourites).pipe(take(1)).subscribe((data) => {
              this.keysData = data;
              Object.values(data).find(clothes => {
                if (clothes.id === this.contentItem.id) {
                  this.isFavourite = true
                } else {
                  this.isFavourite = false;
                }
              })
            })
          })
        })
      }
    })
  }

}
