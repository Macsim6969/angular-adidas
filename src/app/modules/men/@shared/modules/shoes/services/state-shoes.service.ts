import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {newShoesData} from "../../../../../../store/actions/store.actions";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../../store/model/store.model";
import {Observable} from "rxjs";


@Injectable()

export class StateShoesService {
  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>
  ) {
  }


  getDataShoes(){
    this.http.get<Observable<any>>('https://angular-adidas-default-rtdb.firebaseio.com/shoes.json').subscribe((data) => {
      this.store.dispatch(newShoesData({value: data}))
    })
  }
}
