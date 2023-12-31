import {NgModule} from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatIconService} from "../services/matIcon.service";
import {TranslationModule} from "./translate.module";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    TranslationModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    TranslationModule
  ],
  providers: [MatIconService]
})

export class ShareModule {}
