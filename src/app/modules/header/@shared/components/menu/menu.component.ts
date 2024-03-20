import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MenuList} from "../../../../../interfaces/home.interface";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {

  public menuList: MenuList[]

  private streamMenuListSubscription: Subscription;

  constructor(private translate: TranslateService,
              private router: Router) {}

  ngOnInit() {
    this.getDataMenuListFromJson()
  }

  private getDataMenuListFromJson(){
    this.streamMenuListSubscription = this.translate.stream('header.menu-navigation').subscribe((data: MenuList[]) => {
        this.menuList = data;
      });
  }

  public choiceMenu(route: string){
    this.router.navigate([route], {queryParamsHandling: 'merge'}).then();;
  }

  ngOnDestroy() {
    this.streamMenuListSubscription.unsubscribe();
  }
}

