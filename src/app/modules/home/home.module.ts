import {NgModule} from "@angular/core";
import {ShareModule} from "../../shared/share.module";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {StoriesComponent} from "./@shared/components/stories/stories.component";
import {BannerComponent} from "./@shared/components/banner/banner.component";

const routes: Routes = [
  { path: '', component: HomeComponent}
]

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    StoriesComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})

export class HomeModule {
}
