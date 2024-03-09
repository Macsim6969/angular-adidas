import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FavouritesContentComponent} from "./favourites-content.component";
import {ShareModule} from "../../../../shared/share.module";
import {ClothesContentShareModule} from "../../../../shared/clothes-content-share.module";

export const routes: Routes = [
  {path: '', component: FavouritesContentComponent}
]
@NgModule({
  declarations: [
    FavouritesContentComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ClothesContentShareModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})

export class FavouritesContentModule{}
