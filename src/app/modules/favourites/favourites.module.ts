import {NgModule} from "@angular/core";
import {FavouritesComponent} from "./favourites.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";

@NgModule({
  declarations: [
    FavouritesComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [
    FavouritesComponent
  ]
})

export class FavouritesModule {}
