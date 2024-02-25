import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {AuthService} from "./services/auth.service";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: '', component: AuthComponent}
]
@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [
    AuthComponent
  ],
  providers: [AuthService]
})

export class AuthModule {}
