import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { StoreInterface } from "./store/model/store.model";
import { Observable } from "rxjs";
import { newCountry, newLang } from "./store/actions/store.actions";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { HeaderService } from "./modules/header/@shared/services/header.service";
import { StateMenService } from "./services/state-men.service";
import { AuthService } from "./services/auth.service";
import { User } from "./modules/auth/auth.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private lang$: Observable<string>;
  private country$: Observable<string>;

  private lang: string;
  private country: string;

  public isDropdown: boolean = false;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private stateShoesService: StateMenService,
    private authService: AuthService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.initializeUserLogin();
    this.addedQueryParams()
    this.getDataFromHeaderService()
    this.checkNavigation()
    this.stateShoesService.getDataClothes();
    this.authService.user.subscribe((user: User) => {
      this.stateShoesService.getFavouritesClothes(user.id);
    })
  }


  private initializeUserLogin() {
    this.authService.autoLogin();
  }

  private getDataFromHeaderService() {
    this.headerService._isDropdown$.subscribe((data: boolean) => {
      this.isDropdown = data;
    })
  }

  private addedQueryParams() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['hl'] || params['country']) {
        this.store.dispatch(newLang({ value: params['hl'] }))
        this.store.dispatch(newCountry({ value: params['country'] }))
        this.translate.use(params['hl']);
        this.addedQueryParamsRouter(params['hl'], params['country'])
      }
    })
  }

  private addedQueryParamsRouter(lang, country) {
    this.router.navigate([], {
      queryParams: {
        hl: lang,
        country: country
      },
      replaceUrl: true
    }).then();
  }

  private checkNavigation() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.substring(0, event.url.indexOf('?')) !== '/') {
          if (event.url.indexOf('/') !== -1) {
            const currentParams = this.router.routerState.snapshot.root.queryParams;
            if (!currentParams['hl'] || !currentParams['country']) {
              this.router.navigate([], {
                queryParams: {
                  hl: 'en',
                  country: 'US'
                },
              }).then();
            }
          }
        }
      }
    })
  }
}
