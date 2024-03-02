import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../store/model/store.model";
import {newIdUser} from "../../store/actions/store.actions";
import {timer} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth', templateUrl: './auth.component.html', styleUrl: './auth.component.scss'
})
export class AuthComponent  {

}
