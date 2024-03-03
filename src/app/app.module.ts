import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {storeReducers} from "./store/reducers/store.reducers";
import {HttpClientModule} from "@angular/common/http";
import {ShareModule} from "./shared/share.module";
import {HeaderModule} from "./modules/header/header.module";
import {ChoiceLanguagesModule} from "./modules/choice-languages/choice-languages.module";
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {StateMenService} from "./services/state-men.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot({store: storeReducers}),
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    ShareModule,
    ChoiceLanguagesModule
  ],
  providers:[StateMenService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
}
