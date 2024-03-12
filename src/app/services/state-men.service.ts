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
import {Bags} from "../interfaces/bags.interface";


@Injectable()

export class StateMenService {
  private isRemoveSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private paramsSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,
    private clothesContentService: ClothesContentService,
    private router: Router
  ) {
  }

  set _isRemove(value: string | null) {
    this.isRemoveSubject.next(value);
  }

  get _isRemove$() {
    return this.isRemoveSubject;
  }

  get _params() {
    return this.paramsSubject.getValue();
  }

  set _params(value: string | null) {
    this.paramsSubject.next(value);
  }

  public addClothesToBags(idToken: string, data: Bags){
    return this.http.post<ProdsFromService>(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/bags.json`, data).subscribe();
  }

  public getClothesFromBags(idToken: string){
    return this.http.get(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/bags.json`)
  }

  public removeClothesFromBags(idToken: string, id: string){
    return this.http.delete(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/bags/${id}.json`).pipe(take(1)).subscribe()
  }

  public addFavouritesClothes(idToken: string, clothes: ProdsFromService) {
    return this.http.post<ProdsFromService>(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites.json`, clothes).subscribe();
  }

  public removeFavouriteClothes(idToken: string, id: string) {
    return this.http.delete(`https://angular-adidas-default-rtdb.firebaseio.com/users/${idToken}/favourites/${id}.json`).pipe(take(1)).subscribe(() => {
      this.getFavouritesClothes(idToken);
      this._isRemove$.pipe(take(1)).subscribe((data) => {
        if (this._params.includes('favourites')) {
          timer(500).subscribe(() => {
            this.router.navigate(['favourites'], {queryParamsHandling: 'merge'}).then(() => {
              this._isRemove = null;
            });
          });
        }

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
