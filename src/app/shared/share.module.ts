import {NgModule} from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatIconService} from "../services/matIcon.service";
import {TranslationModule} from "./translate.module";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    TranslationModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    TranslationModule
  ],
  providers: [MatIconService]
})

export class ShareModule {}
