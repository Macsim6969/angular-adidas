import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../store/model/store.model";
import {MenuList} from "../../../../../interfaces/home.interface";
import {storeSelectorLang} from "../../../../../store/selectors/store.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  public menuList: MenuList[]

  constructor(private translate: TranslateService,
              private store: Store<{ store: StoreInterface }>,
              private router: Router) {
  }

  ngOnInit() {
    this.getDataMenuListFromJson()
  }

  private getDataMenuListFromJson(){
    this.store.select(storeSelectorLang).subscribe(() => {
      this.translate.get('header.menu-navigation').subscribe((data: MenuList[]) => {
        this.menuList = data
      })
    })
  }

  public choiceMenu(route: string){
    this.router.navigate([route], {queryParamsHandling: 'merge'}).then()
  }
}

