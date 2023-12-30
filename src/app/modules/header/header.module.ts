import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {MenuComponent} from "./@shared/menu/menu.component";
import {TranslateModule} from "@ngx-translate/core";
import {OptionsComponent} from "./@shared/options/options.component";


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class HeaderModule {}
