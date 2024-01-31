import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ClothesContentComponent} from "./clothes-content.component";
import {ShareModule} from "../../../../../shared/share.module";
import {SliderNewsModule} from "../slider-news/slider-news.module";

const routes: Routes = [
  {path: '', component: ClothesContentComponent}
]
@NgModule({
  declarations:[
    ClothesContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    SliderNewsModule
  ],
  exports: []
})

export class ClothesContentModule {

}