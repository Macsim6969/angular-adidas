import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {User} from "../modules/auth/auth.model";
import {StoreInterface} from "../store/model/store.model";
import {Store} from "@ngrx/store";
import {newIdUser} from "../store/actions/store.actions";

export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string,
  registered?: boolean
}

@Injectable()

export class AuthService {
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public token: string = null;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private store: Store<StoreInterface>) {
  }

  sigUp(form: { email: string, password: string }) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnH3aX4XoyXvuvnNnD4vojwyDMPTMEe9s', {
      email: form.email, password: form.password, returnSecureToken: true
    }).pipe(tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  login() {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnH3aX4XoyXvuvnNnD4vojwyDMPTMEe9s', {
      email: 'macs.belousov666@gmail.com', password: 'Vfrcbv-65', returnSecureToken: true
    }).pipe(tap((resData: AuthResponseData) => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      this.store.dispatch(newIdUser({value: resData.idToken}))
    }));
  }

  logout() {
    // this.user.next(null)
    // localStorage.removeItem('userData')
    // if(this.tokenExpirationTimer){
    //   clearTimeout(this.tokenExpirationTimer)
    // }
    // this.tokenExpirationTimer = null
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    }

    const loaderUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loaderUser.token) {
      this.user.next(loaderUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number) {
    // this.tokenExpirationTimer = setTimeout(() => {
    //    this.logout();
    //  }, expirationDuration)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationData);
    this.user.next(user)
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }
}
