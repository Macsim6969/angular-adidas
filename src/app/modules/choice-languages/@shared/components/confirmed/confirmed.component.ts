import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {LanguagesService} from "../../services/languages.service";
import {HeaderService} from "../../../../header/@shared/services/header.service";

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.scss'
})
export class ConfirmedComponent implements OnInit{

  public lang$: Observable<string>;

  constructor(
    private languageService: LanguagesService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.lang$ = this.languageService._activeLang$;
  }

  public close(){
    this.headerService._isDropdown = false;
  }
}
