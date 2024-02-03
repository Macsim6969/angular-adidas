import {Component, OnInit} from '@angular/core';
import {MatIconService} from "../../../../../services/matIcon.service";
import {HeaderService} from "../../services/header.service";
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorClothesData} from "../../../../../store/selectors/store.selectors";
import {iterator} from "rxjs/internal/symbol/iterator";

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
    private store: Store<{store: StoreInterface}>
  ) {}

  ngOnInit() {
    this.store.select(storeSelectorClothesData).subscribe((data) => {
      if (data && data['hoodies']) {
        this.searchItem = [...data['hoodies'], ...data['pants'], ...data['shoes'], ...data['valentines']];
        console.log(this.searchItem);
      }
    });

  }

  toggleTooltip() {
    this.isDropdown = !this.isDropdown;
  };

  closeDropdown(event){
  this.isDropdown = event;
  }

  protected readonly iterator = iterator;
}
