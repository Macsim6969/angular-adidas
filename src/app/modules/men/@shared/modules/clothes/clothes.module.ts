import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../../../../shared/share.module";
import {RouterModule, Routes} from "@angular/router";
import {ClothesComponent} from "./clothes.component";

const routes: Routes = [
  {path: '', component: ClothesComponent}
]

@NgModule({
  declarations: [
    ClothesComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})

export class ClothesModule {}
