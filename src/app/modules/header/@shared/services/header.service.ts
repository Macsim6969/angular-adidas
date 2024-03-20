import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()

export class HeaderService {
  private isDropdown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set _isDropdown(newValue: boolean){
    this.isDropdown$.next(newValue);
  }

  get _isDropdown$(){
    return this.isDropdown$;
  }
}
