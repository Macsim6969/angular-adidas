import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../../../../shared/share.module";
import {RouterModule, Routes} from "@angular/router";
import {HoodiesComponent} from "./hoodies.component";

const routes: Routes = [
  {path: '', component: HoodiesComponent}
]

@NgModule({
  declarations: [
    HoodiesComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})

export class HoodiesModule {}
