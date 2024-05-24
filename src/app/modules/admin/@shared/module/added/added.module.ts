import { NgModule } from '@angular/core';
import { AddedComponent } from './added.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: AddedComponent}
]

@NgModule({
  declarations: [
    AddedComponent
  ],
  exports: [
    AddedComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})

export class AddedModule {}