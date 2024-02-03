import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {MenuComponent} from "./@shared/components/menu/menu.component";
import {TranslateModule} from "@ngx-translate/core";
import {OptionsComponent} from "./@shared/components/options/options.component";
import {HeaderService} from "./@shared/services/header.service";
import {OptionsDropdownComponent} from "./@shared/components/options-dropdown/options-dropdown.component";
import {SearchPipe} from "./@shared/pipe/search.pipe";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    OptionsComponent,
    OptionsDropdownComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    OptionsDropdownComponent
  ],
  providers: [
    HeaderService
  ]
})

export class HeaderModule {}
