import {NgModule} from "@angular/core";
import {ClothesContentLeftComponent} from "./components/clothes-content-left/clothes-content-left.component";
import {ClothesContentRightComponent} from "./components/clothes-content-right/clothes-content-right.component";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {ShareModule} from "./share.module";
import {SliderNewsModule} from "../modules/men/@shared/modules/slider-news/slider-news.module";

@NgModule({
  declarations: [
    ClothesContentLeftComponent,
    ClothesContentRightComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    ShareModule,
    SliderNewsModule
  ],
  exports: [
    ClothesContentLeftComponent,
    ClothesContentRightComponent
  ]
})

export class ClothesContentShareModule {}
