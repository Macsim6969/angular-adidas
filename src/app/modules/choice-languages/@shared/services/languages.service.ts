import { Injectable } from "@angular/core";

export interface Languages {
  icon: string;
  lang: string;
}

@Injectable()
export class LanguagesService {
  private languageList: Languages[] = [
    { icon: 'en', lang: 'English' }
  ];

  get langList(): Languages[] {
    return this.languageList;
  }
}
