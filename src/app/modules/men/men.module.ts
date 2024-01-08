import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MenComponent} from "./men.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {MenMenuComponent} from "./@shared/components/men-menu/men-menu.component";
import {MatCardModule} from "@angular/material/card";

const routes: Routes = [
  {path: 'men', component: MenComponent}
]

@NgModule({
  declarations: [
    MenComponent,
    MenMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    MatCardModule
  ],
  exports: [

  ]
})

export class MenModule {}
