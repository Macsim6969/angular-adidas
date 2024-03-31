import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {LanguagesService} from "../../services/languages.service";
import {HeaderService} from "../../../../header/@shared/services/header.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.scss'
})
export class ConfirmedComponent implements OnInit{

  public lang$: Observable<string>;

  constructor(
    private languageService: LanguagesService,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.lang$ = this.languageService._activeCountry$;
  }

  public close(){
    this.headerService._isDropdown = false;
    this.router.navigate([], {
      queryParams: {
        hl: this.languageService._activeLang$.getValue(),
        country: this.languageService._activeCountry$.getValue()}}).then()
  }
}
