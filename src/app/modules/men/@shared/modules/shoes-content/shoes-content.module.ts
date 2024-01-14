import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ShoesContentComponent} from "./shoes-content.component";

const routes: Routes = [
  {path: '', component: ShoesContentComponent}
]
@NgModule({
  declarations:[
    ShoesContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})

export class ShoesContentModule {

}
