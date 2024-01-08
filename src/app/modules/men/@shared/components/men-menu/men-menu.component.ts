import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../store/model/store.model";
import {Observable} from "rxjs";
import {storeSelectorLang} from "../../../../../store/selectors/store.selectors";
import {MenListMenu} from "../../../../../interfaces/home.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-men-menu',
  templateUrl: './men-menu.component.html',
  styleUrl: './men-menu.component.scss'
})
export class MenMenuComponent implements OnInit, OnDestroy {

  lang$: Observable<string>;

  menuList: MenListMenu[];
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.lang$ = this.store.select(storeSelectorLang)
    this.lang$.subscribe(() => {
      this.translate.get('men.list').subscribe((data: MenListMenu[]) => {
        this.menuList = data
      })
    })
  }

  open(router: string){
    this.router.navigate([router], {queryParamsHandling: 'merge'}).then();
  }

  ngOnDestroy() {
  }
}
