import {NgModule} from "@angular/core";
import {BagsComponent} from "./bags.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {RouterModule, Routes} from "@angular/router";
import {SliderNewsModule} from "../men/@shared/modules/slider-news/slider-news.module";


const routes: Routes = [
  {path: '', component: BagsComponent}
]
@NgModule({
  declarations: [
    BagsComponent
  ],
  exports: [
    BagsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    SliderNewsModule
  ]
})

export class BagsModule {}
