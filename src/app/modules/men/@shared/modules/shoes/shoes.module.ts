import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../../../../shared/share.module";
import {ShoesHeaderComponent} from "./shoes-header/shoes-header.component";
import {RouterModule, Routes} from "@angular/router";
import {ShoesComponent} from "./shoes.component";
import {MatCardModule} from "@angular/material/card";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  {path: '', component: ShoesComponent}
]
@NgModule({
  declarations: [
    ShoesComponent,
    ShoesHeaderComponent
  ],
  exports: [
    CommonModule
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    MatCardModule
  ]
})

export class ShoesModule {}
