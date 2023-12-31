import {NgModule} from "@angular/core";
import {ChoiceLanguagesComponent} from "./choice-languages.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";


@NgModule({
  declarations: [
    ChoiceLanguagesComponent
  ],
  exports: [
    ChoiceLanguagesComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ]
})

export class ChoiceLanguagesModule {
}
