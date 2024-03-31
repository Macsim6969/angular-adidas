import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";

export interface Languages {
  icon: string;
  lang: string;
  country: string;
}

@Injectable()
export class LanguagesService {
  private activeCountry: BehaviorSubject<string> = new BehaviorSubject<string>('English');
  private activeLang: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  private languageList: Languages[] = [
    { icon: 'en', lang: 'English', country: 'US' },
    { icon: 'es', lang: 'Español', country: 'ES' }
  ];

  get langList(): Languages[] {
    return this.languageList;
  }

  set _activeCountry(newLang: string){
    this.activeCountry.next(newLang);
  }

  get _activeCountry$(){
    return this.activeCountry
  }

  set _activeLang(newLang: string){
    this.activeLang.next(newLang);
  }

  get _activeLang$(){
    return this.activeLang
  }
}
