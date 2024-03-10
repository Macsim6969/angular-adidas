import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {favouriteClothes, newClothesData, newHoodiesData, newShoesData} from "../store/actions/store.actions";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../store/model/store.model";
import {ProdsFromService} from "../interfaces/home.interface";
import {BehaviorSubject, exhaustMap, Observable, take, timer} from "rxjs";
import {AuthService} from "./auth.service";
import {ClothesContentService} from "./clothes-content.service";
import {Router} from "@angular/router";


@Injectable()

export class StateMenService {
  private isRemoveSubject: BehaviorSubject<'favourites' | null> = new BehaviorSubject<'favourites' | null>(null);

  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,
    private clothesContentService: ClothesContentService,
    private router: Router
  ) {
  }

  set _isRemove(value: 'favourites' | null) {
    this.isRemoveSubject.next(value);
  }

  get _isRemove$(){
    return this.isRemoveSubject;
  }

  public addFavouritesClothes(idToken: string, clothes: ProdsFromService) {
    return this.http.post<ProdsFromService>(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites.json`, clothes).subscribe();
  }

  public removeFavouriteClothes(idToken: string, id: string) {
    return this.http.delete(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites/${id}.json`).pipe(take(1)).subscribe(() => {
      this.getFavouritesClothes(idToken);
      this._isRemove$.pipe(take(1)).subscribe((data) =>{
        if(data === 'favourites')
        timer(500).subscribe(() =>{
          this.router.navigate(['favourites'], {queryParamsHandling: 'merge'}).then(() =>{
            this._isRemove = null;
          });
        })
      })
    });
  }

  getFavouritesClothes(idToken: string) {
    this.http.get<ProdsFromService[]>(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites.json`).pipe(take(1)).subscribe((data: ProdsFromService[]) => {
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
