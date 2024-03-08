import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ProdsFromService} from "../interfaces/home.interface";

@Injectable()

export class ClothesContentService {
  private choiceColorShoesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private isFavouriteSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private keysDataSubject: BehaviorSubject<ProdsFromService[]> = new BehaviorSubject<ProdsFromService[]>(null);
  private activeSizeShoesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private activeSizeClothesSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get _choiceColorShoes$() {
    return this.choiceColorShoesSubject;
  }

  set _choiceColorShoes(colorId: number) {
    this.choiceColorShoesSubject.next(colorId);
  }

  get _isFavourite$() {
    return this.isFavouriteSubject;
  }

  set _isFavourite(value: boolean) {
    this.isFavouriteSubject.next(value);
  }

  get _keysData$() {
    return this.keysDataSubject;
  }

  set _keysData(key: ProdsFromService[]) {
    this.keysDataSubject.next(key);
  }

  get _activeSizeShoes$() {
    return this.activeSizeShoesSubject;
  }

  set _activeSizeShoes(newSize: number) {
    this.activeSizeShoesSubject.next(newSize);
  }

  get _activeSizeClothes$() {
    return this.activeSizeClothesSubject;
  }

  set _activeSizeClothes(newSize: string) {
    this.activeSizeClothesSubject.next(newSize);
  }

}
