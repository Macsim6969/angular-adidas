import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {StoreInterface} from "./store/model/store.model";
import {combineLatest, Observable} from "rxjs";
import {increment, newCountry, newLang} from "./store/actions/store.actions";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {storeSelectorCountry, storeSelectorLang} from "./store/selectors/store.selectors";
import {primitivesAreNotAllowedInProps} from "@ngrx/store/src/models";
import {TranslateService} from "@ngx-translate/core";

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

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.getDataObservFromStore()
    this.setDataLocalFromObservable()
    this.addedQueryParams()

  }

  private getDataObservFromStore() {
    this.lang$ = this.store.select(storeSelectorLang);
    this.country$ = this.store.select(storeSelectorCountry);
  }

  private setDataLocalFromObservable() {
    combineLatest([this.lang$, this.country$]).subscribe(([lang, country]) => {
      console.log(lang)
      this.lang = lang;
      this.country = country;
      this.translate.use(lang)
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

  private addedQueryParamsRouter(lang, country) {
    this.router.navigate([], {
      queryParams: {
        hl: lang,
        country: country
      }
    }).then()
  }
}
