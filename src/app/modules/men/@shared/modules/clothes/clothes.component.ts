import {Component, OnInit} from '@angular/core';
import {ProdsFromService} from "../../../../../interfaces/home.interface";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../store/model/store.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {storeSelectorClothesData, storeSelectorLang} from "../../../../../store/selectors/store.selectors";
import {clothesMenuHeaderTitle} from "../../../../../interfaces/clothes.interface";


@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrl: './clothes.component.scss'
})
export class ClothesComponent implements OnInit {
  public list: ProdsFromService[];
  public listMenuItem: string[];
  public listMenuItemActive: number;
  public isHover: boolean[] = [];
  public isLoading: boolean = true;
  public activeRoute: string
  private originalList: ProdsFromService[];
  public headerTitleMenu: clothesMenuHeaderTitle[]

  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.translate.use('en')
    this.getShoesDataFromStore()

    this.choiceMenu(0, 'All');
    this.getContentHeader();
  }

  public choiceMenu(index: number, filter: string) {
    this.listMenuItemActive = index
    if (filter !== 'All') {
      this.list = this.originalList.filter((data: any) => data.category === filter);
    } else {
      this.list = this.originalList;
    }
  }

  public showHoverImage(isHovered: boolean, index: number) {
    this.isHover[index] = isHovered;
  }

  public openContent(name_id: string) {
    const newRoute = name_id.replace(/ /g, '_').toLowerCase();
    const currentMenu = this.route.snapshot.params['menu'];
    const newRouterLink = ['/men', currentMenu, newRoute];

    this.router.navigate(newRouterLink, {queryParamsHandling: 'merge'}).then(() => {
    });
  }

  private getShoesDataFromStore() {
    this.route.params.subscribe((params: Params) => {
      this.activeRoute = params['menu']
      this.store.select(storeSelectorClothesData).subscribe((data: any[]) => {
        this.list = data[params['menu']];
        this.originalList = data[params['menu']];
        this.listMenuItem = Array.from(new Set(data[params['menu']]?.map(item => item.category)))
        this.listMenuItem.unshift('All');
        this.listMenuItem.length > 0 ? this.isLoading = false : this.isLoading = true;
      });
    })

  }

  private getContentHeader() {
    this.store.select(storeSelectorLang).subscribe(() => {
      this.translate.get(`men.header-content.${this.activeRoute}`).subscribe((data: clothesMenuHeaderTitle[]) => {
        this.headerTitleMenu = data
      })
    })
  }
}
