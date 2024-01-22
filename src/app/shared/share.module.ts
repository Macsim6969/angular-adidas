import {NgModule} from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatIconService} from "../services/matIcon.service";
import {TranslationModule} from "./translate.module";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingComponent} from "./components/loading/loading.component";
import {MatCardModule} from "@angular/material/card";
@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    TranslationModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    TranslationModule,
    MatProgressSpinnerModule,
    LoadingComponent,
    MatCardModule
  ],
  providers: [MatIconService]
})

export class ShareModule {}
