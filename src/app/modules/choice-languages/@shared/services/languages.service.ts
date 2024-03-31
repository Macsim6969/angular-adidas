import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";

export interface Languages {
  icon: string;
  lang: string;
}

@Injectable()
export class LanguagesService {
  private activeLang: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  private languageList: Languages[] = [
    { icon: 'en', lang: 'English' },
    { icon: 'es', lang: 'Español' }
  ];

  get langList(): Languages[] {
    return this.languageList;
  }

  set _activeLang(newLang: string){
    this.activeLang.next(newLang);
  }

  get _activeLang$(){
    return this.activeLang
  }
}
