import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../store/model/store.model";
import {storeSelectorLang, storeSelectorShoesData} from "../../../../../store/selectors/store.selectors";
import {MenuListMenuShoper} from "../../../../../interfaces/home.interface";
import {StateShoesService} from "./services/state-shoes.service";

@Component({
  selector: 'app-all-shoes',
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.scss'
})
export class ShoesComponent implements OnInit {
  private originalList: any;
  public list: any;
  public listMenuItem: MenuListMenuShoper[];
  public listMenuItemActive: number;

  public isHover: boolean[] = [];
  public isLoading: boolean = true;

  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private stateShoesService: StateShoesService
  ) {
  }

  ngOnInit() {
    this.translate.use('en')
    this.getShoesData();
    this.getListMenu();
    this.getShoesDataFromStore()

    this.choiceMenu(0, 'all');
  }

  private getListMenu() {
    this.store.select(storeSelectorLang).subscribe(() => {
      this.translate.get('men.men-shoes-list').subscribe((data: MenuListMenuShoper[]) => {
        this.listMenuItem = data;

      })
    })
  }

  public choiceMenu(index: number, filter: string) {
    this.listMenuItemActive = index
    if (filter !== 'all') {
      this.list = this.originalList.filter((data: any) => data.category === filter);
    } else {
      this.list = this.originalList;
    }
  }

  private getShoesData() {
    this.stateShoesService.getDataShoes()
  }

  private getShoesDataFromStore() {
    this.store.select(storeSelectorShoesData).subscribe((data) => {
      this.list = data;
      this.originalList = data;
      this.isLoading = false;
      console.log(data)
    });
  }

  showHoverImage(isHovered: boolean, index: number) {
    this.isHover[index] = isHovered;
  }
}
