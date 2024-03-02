import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {AuthService} from "./services/auth.service";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../../shared/share.module";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

const routes: Routes = [
  {path: '', component: AuthComponent}
]
@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent

  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    AuthComponent
  ],
  providers: [AuthService]
})

export class AuthModule {}
