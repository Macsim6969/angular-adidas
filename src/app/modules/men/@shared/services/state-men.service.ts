import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {newHoodiesData, newShoesData} from "../../../../store/actions/store.actions";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../store/model/store.model";
import {ProdsFromService} from "../../../../interfaces/home.interface";
import {Observable, take} from "rxjs";


@Injectable()

export class StateMenService {
  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>
  ) {
  }


  getDataShoes(){
    this.http.get<ProdsFromService>('https://angular-adidas-default-rtdb.firebaseio.com/shoes.json').pipe(take(1)).subscribe((data: ProdsFromService) => {
      this.store.dispatch(newShoesData({value: data}))
    })
  }

  getDataHoodies(){
    this.http.get<ProdsFromService[]>('https://angular-adidas-default-rtdb.firebaseio.com/hoodies.json').pipe(take(1)).subscribe((data: ProdsFromService[]) =>{
      this.store.dispatch(newHoodiesData({value: data}))
    })
  }
}
