import {NgModule} from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatIconService} from "../services/matIcon.service";
import {TranslationModule} from "./translate.module";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingComponent} from "./components/loading/loading.component";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {InfoPopupComponent} from "./components/info-popup/info-popup.component";
import {AsyncPipe, NgClass} from "@angular/common";
@NgModule({
  declarations: [
    LoadingComponent,
    InfoPopupComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    TranslationModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    NgClass
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    TranslationModule,
    MatProgressSpinnerModule,
    LoadingComponent,
    InfoPopupComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [MatIconService]
})

export class ShareModule {}
