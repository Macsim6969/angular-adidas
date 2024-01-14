import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MenComponent} from "./men.component";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {MenMenuComponent} from "./@shared/components/men-menu/men-menu.component";
import {MatCardModule} from "@angular/material/card";
import {ArticlesComponent} from "./@shared/components/articles/articles.component";
import {HttpClientModule} from "@angular/common/http";
import {StateShoesService} from "./@shared/modules/shoes/services/state-shoes.service";

const routes: Routes = [
  {
    path: '', component: MenComponent, children: [
      {path: '', component: MenMenuComponent},
      {path: 'shoes', loadChildren: () => import('./@shared/modules/shoes/shoes.module').then(m => m.ShoesModule)},
      {path: ':id', loadChildren: () => import('./@shared/modules/shoes-content/shoes-content.module').then(m => m.ShoesContentModule)}

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
    MatCardModule,
    HttpClientModule
  ],
  providers: [StateShoesService]
})

export class MenModule {
}
