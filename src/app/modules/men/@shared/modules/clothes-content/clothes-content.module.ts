import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ClothesContentComponent} from "./clothes-content.component";
import {ShareModule} from "../../../../../shared/share.module";

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
    ShareModule
  ],
  exports: []
})

export class ClothesContentModule {

}
