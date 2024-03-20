import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MenListMenu} from "../../../../../interfaces/home.interface";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-men-menu',
  templateUrl: './men-menu.component.html',
  styleUrl: './men-menu.component.scss'
})
export class MenMenuComponent implements OnInit, OnDestroy {
  public menuList: MenListMenu[];
  private translateSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.streamMenuListFromJson();

  }

  private streamMenuListFromJson(){
   this.translateSubscription = this.translate.stream('men.list').subscribe((data: MenListMenu[]) => {
      this.menuList = data;
    })
  }

  public open(router: string){
    this.router.navigate([router], {queryParamsHandling: 'merge'}).then();
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }
}
