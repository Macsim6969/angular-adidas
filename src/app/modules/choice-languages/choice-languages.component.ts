import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HeaderService} from "../header/@shared/services/header.service";
import {Subscription, take, timer} from "rxjs";
import {Languages, LanguagesService} from "./@shared/services/languages.service";
import {MatIconService} from "../../services/matIcon.service";
import {StoreInterface} from "../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorLang} from "../../store/selectors/store.selectors";
import {TranslateService} from "@ngx-translate/core";
import {newLang} from "../../store/actions/store.actions";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmedComponent} from "./@shared/components/confirmed/confirmed.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choice-languages',
  templateUrl: './choice-languages.component.html',
  styleUrl: './choice-languages.component.scss'
})
export class ChoiceLanguagesComponent implements OnInit, OnDestroy {
  @ViewChild('popup', {read: ElementRef}) popupRef: ElementRef;

  public langList: Languages[];
  public activeLang: string;

  private langSubscription: Subscription;

  constructor(
    private headerService: HeaderService,
    private languageService: LanguagesService,
    private store: Store<{store: StoreInterface}>,
    private matIcon: MatIconService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeActiveLangFromStore();
    this.initializeLangListData();
  }

  private initializeActiveLangFromStore(){
   this.langSubscription = this.store.select(storeSelectorLang).subscribe((data: string) =>{
      this.activeLang = data;
    })
  }

  private initializeLangListData(){
    this.langList = this.languageService.langList;
  }

  public choiceLang({icon, lang}){
    this.activeLang = icon;
    this.translate.use(icon);
    this.store.dispatch(newLang({value: icon}));
    this.languageService._activeLang = lang;
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmedComponent);

    dialogRef.afterClosed().subscribe();
  }

  public closePopup() {
    this.popupRef.nativeElement.classList.add('closest')
    timer(1000).pipe(take(1)).subscribe(() => {
      this.headerService._isDropdown = false;
    })
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }
}
