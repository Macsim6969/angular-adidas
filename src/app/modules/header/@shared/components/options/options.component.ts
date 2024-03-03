import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {MatIconService} from "../../../../../services/matIcon.service";
import {HeaderService} from "../../services/header.service";
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorClothesData} from "../../../../../store/selectors/store.selectors";
import {iterator} from "rxjs/internal/symbol/iterator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent implements OnInit {

  isDropdown: boolean;
  searchItem: any;
  searchItemCategory: any
  searchListCategory: any
  searchText: string = '';
  searchListVisible: boolean = false;
  menuAll: boolean;
  menuCategory: boolean
  protected readonly iterator = iterator;

  constructor(
    private matIcon: MatIconService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.store.select(storeSelectorClothesData).subscribe((data) => {
      if (data && data['hoodies']) {
        this.searchItem = [...data['hoodies'], ...data['pants'], ...data['shoes'], ...data['valentines']];
        this.searchItemCategory = this.searchItem;
        this.searchItemCategory = Array.from(new Set([...data['hoodies'], ...data['pants'], ...data['shoes'], ...data['valentines']]?.map(item => item.category)))
      }
    });

  }

  choiceMenuSearch(active: 'all' | 'category') {
    if (active === 'all') {
      this.menuAll = true;
      this.menuCategory = false;
      this.searchListVisible = true;
      this.searchListCategory = this.searchItem
    }
    if (active === 'category') {
      this.searchListVisible = true;
      this.menuCategory = true;
      this.menuAll = false;
    }
  }

  openSearchList() {
    this.searchListVisible = true;
  }

  closeSearchList() {
    this.searchListVisible = false;
  }

  backList() {
    this.menuAll = false;
    this.menuCategory = false;
  }

  openSearchCategory(id: string) {
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

  toggleTooltip() {
    this.isDropdown = !this.isDropdown;
  };

  closeDropdown(event) {
    this.isDropdown = event;
  }

  openFavourites() {
    this.router.navigate(['/favourites'], {queryParamsHandling: 'merge'}).then()
  }
}
