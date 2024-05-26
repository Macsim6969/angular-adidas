import { NgModule } from '@angular/core';
import { AddedComponent } from './added.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ScanResultsComponent } from '../../components/scan-results/scan-results.component';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { ShareModule } from '../../../../../shared/share.module';

const routes: Routes = [
  {
    path: '', component: AddedComponent, children: [
      { path: 'result', component: ScanResultsComponent },
      { path: 'scan', component: FileUploadComponent }
    ]
  }
]

@NgModule({
  declarations: [
    AddedComponent,
    ScanResultsComponent,
    FileUploadComponent
  ],
  exports: [
    AddedComponent,
    ScanResultsComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})

export class AddedModule { }