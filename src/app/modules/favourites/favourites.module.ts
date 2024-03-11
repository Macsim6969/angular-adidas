import {NgModule} from "@angular/core";
import {FavouritesComponent} from "./favourites.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {RouterModule, Routes} from "@angular/router";
import {SliderNewsModule} from "../men/@shared/modules/slider-news/slider-news.module";
import {FavouritesListComponent} from "./component/favourites-list/favourites-list.component";

const routes: Routes = [
  {
    path: '', component: FavouritesComponent, children: [
      {path: '', component: FavouritesListComponent},
      {
        path: ':products',
        loadChildren: () => import('./module/favourites-content/favourites-content.module').then((m) => m.FavouritesContentModule)
      }
    ]
  }
]

@NgModule({
  declarations: [
    FavouritesComponent,
    FavouritesListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    SliderNewsModule
  ],
  exports: [
    FavouritesComponent
  ],
  providers: []
})

export class FavouritesModule {
}
