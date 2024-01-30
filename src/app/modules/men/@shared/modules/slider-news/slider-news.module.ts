import {NgModule} from "@angular/core";
import {SliderNewsComponent} from "./slider-news.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../../../../shared/share.module";
import {DragScrollComponent, DragScrollItemDirective} from "ngx-drag-scroll";


@NgModule({
  declarations: [
    SliderNewsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DragScrollComponent,
    DragScrollItemDirective,
  ],
  exports: [
    SliderNewsComponent
  ]
})

export class SliderNewsModule {}
