import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {storeSelectorLang} from "../../store/selectors/store.selectors";
import {Subscription} from "rxjs";
import {StoreInterface} from "../../store/model/store.model";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrl: './men.component.scss'
})
export class MenComponent implements OnInit, OnDestroy{
private langSubscription: Subscription;
  constructor(private translate: TranslateService,
               private store: Store<{store: StoreInterface}>) {}

  ngOnInit() {

    this.initializeActiveLang();
  }

  private initializeActiveLang(){
    this.langSubscription = this.store.select(storeSelectorLang).subscribe((lang:string) =>{
      this.translate.use(lang)
    })
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }
}
