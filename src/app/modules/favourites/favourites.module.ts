import {NgModule} from "@angular/core";
import {FavouritesComponent} from "./favourites.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {RouterModule, Routes} from "@angular/router";
import {SliderNewsModule} from "../men/@shared/modules/slider-news/slider-news.module";

const routes: Routes = [
  {path: '', component: FavouritesComponent}
]
@NgModule({
  declarations: [
    FavouritesComponent
  ],
    imports: [
        CommonModule,
        ShareModule,
        RouterModule.forChild(routes),
        SliderNewsModule
    ],
  exports: [
    FavouritesComponent
  ]
})

export class FavouritesModule {}
