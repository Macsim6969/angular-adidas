import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {favouriteClothes, newClothesData, newHoodiesData, newShoesData} from "../store/actions/store.actions";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../store/model/store.model";
import {ProdsFromService} from "../interfaces/home.interface";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";
import {ClothesContentService} from "./clothes-content.service";


@Injectable()

export class StateMenService {
  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,
    private clothesContentService: ClothesContentService
  ) {}

  public addFavouritesClothes(idToken: string, clothes: ProdsFromService) {
    return this.http.post<ProdsFromService>(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites.json`, clothes).subscribe();
  }

  public removeFavouriteClothes(idToken: string, id: string) {
    return this.http.delete(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites/${id}.json`).pipe(take(1)).subscribe(() =>{
      this.getFavouritesClothes(idToken);
    });
  }

  getFavouritesClothes(idToken: string) {
    this.http.get<ProdsFromService[]>(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites.json`).pipe(take(1)).subscribe((data: ProdsFromService[]) =>{
      this.clothesContentService._arrayItems = data;
      this.store.dispatch(favouriteClothes({value: data}))
    })
  }

  getDataClothes() {
    this.http.get<ProdsFromService[]>('https://angular-adidas-default-rtdb.firebaseio.com/clothes.json').pipe(take(1)).subscribe((data: ProdsFromService[]) => {
      this.store.dispatch(newClothesData({value: data}))
    })
  }
}
