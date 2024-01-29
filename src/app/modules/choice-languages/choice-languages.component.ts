import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {HeaderService} from "../header/@shared/services/header.service";
import {take, timer} from "rxjs";
import {Languages, LanguagesService} from "./@shared/services/languages.service";
import {MatIconService} from "../../services/matIcon.service";

@Component({
  selector: 'app-choice-languages',
  templateUrl: './choice-languages.component.html',
  styleUrl: './choice-languages.component.scss'
})
export class ChoiceLanguagesComponent implements OnInit {
  @ViewChild('popup', {read: ElementRef}) popupRef: ElementRef;

  langList: Languages[];
  activeLang: string = 'en';

  constructor(
    private headerService: HeaderService,
    private languageService: LanguagesService,
    private matIcon: MatIconService
  ) {
  }

  ngOnInit() {
    this.langList = this.languageService.langList;
  }

  closePopup() {
    this.popupRef.nativeElement.classList.add('closest')
    timer(1000).pipe(take(1)).subscribe(() => {
      this.headerService.handleDropdown(false);
    })
  }
}
