import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Panels } from '../../interface/panels.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-added',
  templateUrl: './added.component.html',
  styleUrl: './added.component.scss'
})
export class AddedComponent implements OnInit, OnDestroy {

  public panelsContent: Panels[];
  private translateSubscription: Subscription;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initializePanelsDataFromJson();
  }

  private initializePanelsDataFromJson() {
    this.translateSubscription = this.translate.get('admin.addedPanel').subscribe((data: Panels[]) => {
      this.panelsContent = data;
    })
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

}
