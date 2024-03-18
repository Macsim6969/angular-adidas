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
import {AttentionComponent} from "./components/attention/attention.component";
import {MatSelectModule} from "@angular/material/select";
@NgModule({
  declarations: [
    LoadingComponent,
    InfoPopupComponent,
    AttentionComponent
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
    MatSelectModule,
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
    AttentionComponent,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [MatIconService]
})

export class ShareModule {}
