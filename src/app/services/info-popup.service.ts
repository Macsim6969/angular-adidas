import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable()

export class InfoPopupService {
  private favouriteClotheImageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private favoriteClotheTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private descriptionTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  set _favouriteClotheImage(newImage: string){
    this.favouriteClotheImageSubject.next(newImage);
  }

  get _favouriteClotheImage$(){
    return this.favouriteClotheImageSubject;
  }

  set _favoriteClotheTitle(newTitle: string){
    this.favoriteClotheTitleSubject.next(newTitle);
  }

  get _favoriteClotheTitle$(){
    return this.favoriteClotheTitleSubject;
  }

  set _descriptionTitle(value : string){
    this.descriptionTitleSubject.next(value)
  }

  get _descriptionTitle$(){
    return this.descriptionTitleSubject;
  }
}
