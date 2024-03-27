import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {storeReducers} from "./store/reducers/store.reducers";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ShareModule} from "./shared/share.module";
import {HeaderModule} from "./modules/header/header.module";
import {ChoiceLanguagesModule} from "./modules/choice-languages/choice-languages.module";
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {StateMenService} from "./services/state-men.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth.guard";
import {InfoPopupService} from "./services/info-popup.service";
import {ClothesContentService} from "./services/clothes-content.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [TranslateModule],
  imports: [
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot({store: storeReducers}),
    ShareModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    ChoiceLanguagesModule
  ],
  providers:[StateMenService, AuthService, AuthGuard, InfoPopupService, ClothesContentService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
