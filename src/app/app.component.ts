import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {StoreInterface} from "./store/model/store.model";
import {combineLatest, Observable, take} from "rxjs";
import {increment, newCountry, newLang} from "./store/actions/store.actions";
import {ActivatedRoute, NavigationEnd, NavigationExtras, Params, Router} from "@angular/router";
import {storeSelectorCountry, storeSelectorLang} from "./store/selectors/store.selectors";
import {primitivesAreNotAllowedInProps} from "@ngrx/store/src/models";
import {TranslateService} from "@ngx-translate/core";
import {HeaderService} from "./modules/header/@shared/services/header.service";
import {StateMenService} from "./services/state-men.service";
import {AuthService} from "./services/auth.service";
import {User} from "./modules/auth/auth.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  lang$: Observable<string>;
  country$: Observable<string>;

  lang: string;
  country: string;

  isDropdown: boolean = false;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private stateShoesService: StateMenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeUserLogin();
    this.getDataObservFromStore()
    this.setDataLocalFromObservable()
    this.addedQueryParams()
    this.getDataFromHeaderService()
    this.checkNavigation()
    this.stateShoesService.getDataClothes();
    this.authService.user.subscribe((user: User) =>{
      this.stateShoesService.getFavouritesClothes(user.id);
    })
  }

  private initializeUserLogin(){
    this.authService.autoLogin();
  }

  private getDataObservFromStore() {
    this.lang$ = this.store.select(storeSelectorLang);
    this.country$ = this.store.select(storeSelectorCountry);
  }

  private setDataLocalFromObservable() {
    combineLatest([this.lang$, this.country$]).subscribe(([lang, country]) => {
      this.lang = lang;
      this.country = country;
    })
  }

  private addedQueryParams() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['hl'] || params['country']) {
        this.store.dispatch(newLang({value: params['hl']}))
        this.store.dispatch(newCountry({value: params['country']}))
        this.addedQueryParamsRouter(params['hl'], params['country'])
      } else {
        this.addedQueryParamsRouter(this.lang, this.country)
      }
    })
  }

  private getDataFromHeaderService() {
    this.headerService._isDropdown$.subscribe((data: boolean) => {
      this.isDropdown = data;
    })
  }

  private addedQueryParamsRouter(lang, country) {
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     hl: lang,
    //     country: country
    //   },
    //   replaceUrl: false
    // };
    // this.router.navigate([], navigationExtras).then();
  }

  private checkNavigation() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.substring(0, event.url.indexOf('?')) !== '/') {
          if (event.url.indexOf('/') !== -1) {
            const currentParams = this.router.routerState.snapshot.root.queryParams;
            if (!currentParams['hl'] || !currentParams['country']) {
              const defaultParams = {
                hl: 'en',
                country: 'US'
              };

              this.router.navigate([], {
                queryParams: defaultParams,
              }).then();
            }
          } else {
            this.router.navigate(['/']).then();
          }
        }
      }
    })
  }
}
