import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {newIdUser} from "../../../../store/actions/store.actions";
import {Subscription, take, timer} from "rxjs";
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
export class SignUpComponent implements OnInit, OnDestroy{
  @Input() idForm: number;
  public id: string;
  public hide = true;
  public form: FormGroup;
  public isLoading: boolean;

  private sigUpSubscription: Subscription;
  private loginSubscription: Subscription;
  private storeSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private store: Store<{ store: StoreInterface }>,
    private router: Router
    ) {}

  ngOnInit() {
    this.initializeDataForm();
  }

  private initializeDataForm(){
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  public signUp() {
    this.isLoading = true;
    this.sigUpSubscription = this.authService.sigUp(this.form.value).subscribe((data) => {
    this.store.dispatch(newIdUser({value: data.localId}))
      timer(1000).subscribe(() =>{
        this.storeSubscription = this.store.select((state) => state.store.idUser).subscribe(data =>{
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
   this.loginSubscription = this.authService.login().subscribe((data) => {
     this.store.dispatch(newIdUser({value: data.localId}))
      timer(100).pipe(take(1)).subscribe(() =>{
        this.storeSubscription = this.store.select((state) => state.store.idUser).subscribe(data =>{
          this.id = data
        })
      })
      this.router.navigate(['/men'], {queryParamsHandling: 'merge'}).then();
      this.isLoading = false;
    }, error => {
    })
    this.form.reset();
  }

  ngOnDestroy() {
    this.sigUpSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }
}
