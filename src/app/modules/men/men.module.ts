import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MenComponent} from "./men.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {MenMenuComponent} from "./@shared/components/men-menu/men-menu.component";
import {ArticlesComponent} from "./@shared/components/articles/articles.component";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {
    path: '', component: MenComponent, children: [
      {path: '', component: MenMenuComponent},
      {path: ':menu', loadChildren: () => import('./@shared/modules/clothes/clothes.module').then(m => m.ClothesModule)},
      {path: ':menu/:clothes', loadChildren: () => import('./@shared/modules/clothes-content/clothes-content.module').then(m => m.ClothesContentModule)},
    ]
  }
]

@NgModule({
  declarations: [
    MenComponent,
    MenMenuComponent,
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    HttpClientModule
  ],
  providers: []
})

export class MenModule {
}
