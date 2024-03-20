import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconService} from "../../../../../services/matIcon.service";
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorClothesData} from "../../../../../store/selectors/store.selectors";
import {Router} from "@angular/router";
import {ProdsFromService} from "../../../../../interfaces/home.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent implements OnInit, OnDestroy {

 public isDropdown: boolean;
  public searchItem: any;
  public  searchItemCategory: any
  public searchListCategory: any
  public searchText: string = '';
  public searchListVisible: boolean = false;
  public  menuAll: boolean;
  public  menuCategory: boolean

  private storeSubscription: Subscription;

  constructor(
    private matIcon: MatIconService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeAllClothesInOneArray();
  }

  private initializeAllClothesInOneArray(){
   this.storeSubscription = this.store.select(storeSelectorClothesData).subscribe((data: ProdsFromService[]) => {
      if (data && data['hoodies']) {
        this.searchItem = [...data['hoodies'], ...data['pants'], ...data['shoes'], ...data['valentines']];
        this.searchItemCategory = this.searchItem;
        this.searchItemCategory = Array.from(new Set([...data['hoodies'], ...data['pants'], ...data['shoes'], ...data['valentines']]?.map(item => item.category)))
      }
    });
  }

  public choiceMenuSearch(active: 'all' | 'category') {
    if (active === 'all') {
      this.setChangesMenuSetting(true, false, true);
      this.searchListCategory = this.searchItem;
    }
    if (active === 'category') {
      this.setChangesMenuSetting(false, true, true);
    }
  }

  private setChangesMenuSetting(menuAll: boolean, menuCategory: boolean, searchListVisible: boolean){
    this.menuAll = menuAll;
    this.menuCategory = menuCategory;
    this.searchListVisible = searchListVisible;
  }

  public openSearchList() {
    this.searchListVisible = true;
  }

  public closeSearchList() {
    this.searchListVisible = false;
  }

  public backList() {
    this.menuAll = false;
    this.menuCategory = false;
  }

  public openSearchCategory(id: string) {
    this.searchListCategory = this.searchItem.filter(data => {
      return data.category === id;
    });

    this.menuAll = true;
    this.menuCategory = false;
  }

  public openClothes(route: string, name: string) {
    const newRoute = name.replace(/ /g, '_').toLowerCase();
    this.router.navigate(['/men/' + route + '/' + newRoute], {queryParamsHandling: 'merge'}).then();
    this.searchText = '';
    this.closeSearchList();
  }

  public toggleTooltip() {
    this.isDropdown = !this.isDropdown;
  };

  public closeDropdown(event) {
    this.isDropdown = event;
  }

  public openBag() {
    this.router.navigate(['/bags'], {queryParamsHandling: 'merge'}).then()
  }

  public openFavourites() {
    this.router.navigate(['/favourites'], {queryParamsHandling: 'merge'}).then()
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
