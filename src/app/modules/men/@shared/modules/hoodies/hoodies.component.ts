import {Component, OnInit} from '@angular/core';
import {MenuListMenuShoper, ProdsFromService} from "../../../../../interfaces/home.interface";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../store/model/store.model";
import {Router} from "@angular/router";
import {
  storeSelectorHoodiesData,
  storeSelectorLang
} from "../../../../../store/selectors/store.selectors";


@Component({
  selector: 'app-hoodies',
  templateUrl: './hoodies.component.html',
  styleUrl: './hoodies.component.scss'
})
export class HoodiesComponent implements  OnInit{
  private originalList: ProdsFromService[];
  public list: ProdsFromService[];
  public listMenuItem: string[];
  public listMenuItemActive: number;

  public isHover: boolean[] = [];
  public isLoading: boolean = true;

  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.use('en')
    // this.getListMenu();
    this.getShoesDataFromStore()

    //  this.choiceMenu(0, 'all');
  }

  // private getListMenu() {
  //   this.store.select(storeSelectorLang).subscribe(() => {
  //     this.translate.get('men.men-shoes-list').subscribe((data: MenuListMenuShoper[]) => {
  //       this.listMenuItem = data;
  //     })
  //   })
  // }

  public choiceMenu(index: number, filter: string) {
    this.listMenuItemActive = index
    if (filter !== 'all') {
      this.list = this.originalList.filter((data: any) => data.category === filter);
    } else {
      this.list = this.originalList;
    }
  }

  private getShoesDataFromStore() {
    this.store.select(storeSelectorHoodiesData).subscribe((data: ProdsFromService[]) => {
      this.list = data;
      this.originalList = data;
      this.listMenuItem = Array.from(new Set(data.map(item => item.category)))
      this.listMenuItem.length > 0 ? this.isLoading = false : this.isLoading = true;
    });
  }

  public showHoverImage(isHovered: boolean, index: number) {
    this.isHover[index] = isHovered;
  }

  public openContent(name_id: string) {
    const newRoute = '_' + name_id.replace(/ /g, '_').toLowerCase();
    this.router.navigate(['/men/hoodies' + newRoute], {queryParamsHandling: 'merge'}).then()
  }
}
