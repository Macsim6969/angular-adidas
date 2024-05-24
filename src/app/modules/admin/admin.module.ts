import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ShareModule } from "../../shared/share.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { PanelsComponent } from "./@shared/components/panels/panels.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'goods', loadChildren: () => import('./@shared/module/goods/goods.module').then(m => m.GoodsModule) },
      { path: 'added', loadChildren: () => import('./@shared/module/added/added.module').then(m => m.AddedModule) }
    ]
  }
]
@NgModule({
  declarations: [
    AdminComponent,
    PanelsComponent
  ],
  exports: [
    AdminComponent,
    PanelsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ]
})

export class AdminModule { }