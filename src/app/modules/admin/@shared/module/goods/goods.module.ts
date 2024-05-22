import { NgModule } from "@angular/core";
import { GoodsComponent } from "./goods.component";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ShareModule } from "../../../../../shared/share.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{
  path: '', component: GoodsComponent
}]
@NgModule({
  declarations: [
    GoodsComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})

export class GoodsModule { }