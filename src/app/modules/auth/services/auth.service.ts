import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) {
  }

  sigUp() {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnH3aX4XoyXvuvnNnD4vojwyDMPTMEe9s', {
      email: 'macs.belousov666@gmail.com', password: 'Vfrcbv-65', returnSecureToken: true
    })
  }
}
