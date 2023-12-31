import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()

export class HeaderService {
  private isDropdown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public isDropdownSubject: Observable<boolean> = this.isDropdown$.asObservable();

  handleDropdown(newValue: boolean){
    this.isDropdown$.next(newValue);
  };
}
