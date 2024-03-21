import {NgModule} from "@angular/core";
import {ShareModule} from "../../shared/share.module";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {StoriesComponent} from "./@shared/components/stories/stories.component";
import {BannerComponent} from "./@shared/components/banner/banner.component";
import {TranslationModule} from "../../shared/translate.module";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  { path: '', component: HomeComponent}
]

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    StoriesComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    StoriesComponent
  ]
})

export class HomeModule {
}
