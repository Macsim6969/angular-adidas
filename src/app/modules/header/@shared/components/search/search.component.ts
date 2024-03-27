import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {storeSelectorClothesData} from "../../../../../store/selectors/store.selectors";
import {ProdsFromService} from "../../../../../interfaces/home.interface";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../store/model/store.model";
import {Subscription} from "rxjs";
import {MatIconService} from "../../../../../services/matIcon.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy{

  public searchItem: any;
  public  searchItemCategory: any;
  public searchListCategory: any;
  public searchText: string = '';
  public searchListVisible: boolean = false;
  public  menuAll: boolean;
  public  menuCategory: boolean
  private storeSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<{ store: StoreInterface }>,
    private matIcon: MatIconService
  ) {
  }

  ngOnInit() {
    this.initializeAllClothesInOneArray();

    if(window.innerWidth < 576){
      document.body.style.overflow = 'hidden';
    }
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

  public openClothes(route: string, name: string) {
    const newRoute = name.replace(/ /g, '_').toLowerCase();
    this.router.navigate(['/men/' + route + '/' + newRoute], {queryParamsHandling: 'merge'}).then();
    this.searchText = '';
    this.closeSearchList();
  }

  public closeSearchList() {
    this.searchListVisible = false;
  }

  public openSearchCategory(id: string) {
    this.searchListCategory = this.searchItem.filter(data => {
      return data.category === id;
    });

    this.menuAll = true;
    this.menuCategory = false;
  }

  public openSearchList() {
    this.searchListVisible = true;
  }

  public backList() {
    this.menuAll = false;
    this.menuCategory = false;
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
      document.body.style.overflow = '';
  }

}
