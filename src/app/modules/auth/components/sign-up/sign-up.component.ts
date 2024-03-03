import {Component, Input, OnInit} from '@angular/core';
import {newIdUser} from "../../../../store/actions/store.actions";
import {timer} from "rxjs";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../store/model/store.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-sign-up',

  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  @Input() idForm: number;
  public id: string
  hide = true;
  form: FormGroup

  isLoading: boolean = false
  constructor(
    private authService: AuthService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router
    ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  public signUp() {
    this.isLoading = true;
    this.authService.sigUp(this.form.value).subscribe((data) => {
      console.log(data, 'data')
      this.store.dispatch(newIdUser({value: data.localId}))
      timer(1000).subscribe(() =>{
        this.store.select((state) => state.store.idUser).subscribe(data =>{
          this.id = data
        })
      })
      this.isLoading = false;
    }, error => {
      console.log(error)
    })

    this.form.reset();
  }

  public login(){
    this.isLoading = true;
    this.authService.login().subscribe((data) => {
      console.log(data, 'data')
      this.store.dispatch(newIdUser({value: data.localId}))
      timer(100).subscribe(() =>{
        this.store.select((state) => state.store.idUser).subscribe(data =>{
          this.id = data
        })
      })
      this.router.navigate(['/men'], {queryParamsHandling: 'merge'}).then();
      this.isLoading = false;
    }, error => {
      console.log(error)
    })
    this.form.reset();
  }
}
