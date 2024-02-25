import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../store/model/store.model";
import {newIdUser} from "../../store/actions/store.actions";
import {timer} from "rxjs";

@Component({
  selector: 'app-auth', templateUrl: './auth.component.html', styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  public  id: string
  constructor(
    private authService: AuthService,
    private store: Store<{ store: StoreInterface }>) {
  }

  ngOnInit() {
    console.log(1)
    this.authService.sigUp().subscribe((data) => {
      console.log(data, 'data')
      this.store.dispatch(newIdUser({value: data.localId}))
      timer(1000).subscribe(() =>{
       this.store.select((state) => state.store.idUser).subscribe(data =>{
         this.id = data
       })
      })
    }, error => {
      console.log(error)
    })

  }
}
