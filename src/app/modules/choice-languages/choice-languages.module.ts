import {NgModule} from "@angular/core";
import {ChoiceLanguagesComponent} from "./choice-languages.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: ChoiceLanguagesComponent}
]
@NgModule({
  declarations: [
    ChoiceLanguagesComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class ChoiceLanguagesModule {}
