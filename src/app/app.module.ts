import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {storeReducers} from "./store/reducers/store.reducers";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {ShareModule} from "./shared/share.module";
import {HeaderModule} from "./modules/header/header.module";
const routes: Routes = [
  {
    path: 'languages',
    loadChildren: () => import('./modules/choice-languages/choice-languages.module').then((m) => m.ChoiceLanguagesModule)
  }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({store: storeReducers}),
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    ShareModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
