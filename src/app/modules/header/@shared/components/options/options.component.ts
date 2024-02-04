import {Component, HostListener, OnInit} from '@angular/core';
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
  searchItem: any
  searchText: string

  constructor(
    private matIcon: MatIconService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router
  ) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement
    if (document.querySelector('.search-list') as HTMLElement) {

      if (!targetElement.closest('.search-list')) {
        document.querySelectorAll('.search-list').forEach((e) => {
          e.classList.add('hide')
          this.searchText = '';
        })
      }
    }
  }

  ngOnInit() {
    this.store.select(storeSelectorClothesData).subscribe((data) => {
      if (data && data['hoodies']) {
        this.searchItem = [...data['hoodies'], ...data['pants'], ...data['shoes'], ...data['valentines']];
        console.log(this.searchItem);
      }
    });

  }

  public openClothes(route: string, name: string) {
    const newRoute = name.replace(/ /g, '_').toLowerCase();
    this.router.navigate(['/men/' + route+'/' +newRoute], {queryParamsHandling: 'merge'}).then();
    this.searchText = '';
  }

  toggleTooltip() {
    this.isDropdown = !this.isDropdown;
  };

  closeDropdown(event) {
    this.isDropdown = event;
  }

  protected readonly iterator = iterator;
}
