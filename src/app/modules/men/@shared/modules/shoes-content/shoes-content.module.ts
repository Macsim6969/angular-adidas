import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ShoesContentComponent} from "./shoes-content.component";
import {ShareModule} from "../../../../../shared/share.module";

const routes: Routes = [
  {path: '', component: ShoesContentComponent}
]
@NgModule({
  declarations:[
    ShoesContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  exports: []
})

export class ShoesContentModule {

}
