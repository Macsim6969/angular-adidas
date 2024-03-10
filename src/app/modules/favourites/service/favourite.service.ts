import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()

export class FavouriteService{
  private paramsSubject: BehaviorSubject<'favourites' | null> = new BehaviorSubject<'favourites' | null>(null);

  set _params(value: 'favourites' | null){
    this.paramsSubject.next(value);
  }

  get _params(){
    return this.paramsSubject.getValue();
  }
}
