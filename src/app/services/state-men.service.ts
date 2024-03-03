import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {newClothesData, newHoodiesData, newShoesData} from "../store/actions/store.actions";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../store/model/store.model";
import {ProdsFromService} from "../interfaces/home.interface";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";


@Injectable()

export class StateMenService {
  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,
    private authService: AuthService
  ) {
  }

  public addFavouritesClothes(idToken: string, clothes: ProdsFromService) {
    console.log(idToken, clothes)
    return this.http.post<ProdsFromService>(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites.json`, clothes).subscribe();
  }

  getFavouritesClothes(idToken: string) {
    console.log(idToken)
    return this.http.get<ProdsFromService[]>(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites.json`)
  }

  getDataClothes() {
    this.http.get<ProdsFromService[]>('https://angular-adidas-default-rtdb.firebaseio.com/clothes.json').pipe(take(1)).subscribe((data: ProdsFromService[]) => {
      this.store.dispatch(newClothesData({value: data}))
    })
  }
}
