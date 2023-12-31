import {NgModule} from "@angular/core";
import {ChoiceLanguagesComponent} from "./choice-languages.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {LanguagesService} from "./@shared/services/languages.service";
import {HeaderService} from "../header/@shared/services/header.service";


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
  ],
  providers: [
    LanguagesService,
    HeaderService
  ]
})

export class ChoiceLanguagesModule {
}
