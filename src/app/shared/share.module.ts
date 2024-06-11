import { NgModule, OnInit } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatIconService } from "../services/matIcon.service";
import { TranslationModule } from "./translate.module";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoadingComponent } from "./components/loading/loading.component";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { InfoPopupComponent } from "./components/info-popup/info-popup.component";
import { AsyncPipe, CommonModule, NgClass } from "@angular/common";
import { AttentionComponent } from "./components/attention/attention.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { AdminGoodsComponent } from "./components/admin-goods/admin-goods.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    LoadingComponent,
    InfoPopupComponent,
    AttentionComponent,
    AdminGoodsComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    AsyncPipe,
    TranslationModule,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    AdminGoodsComponent,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    TranslationModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    LoadingComponent,
    InfoPopupComponent,
    AttentionComponent,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MatIconService]
})

export class ShareModule { }
