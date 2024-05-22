import { Component, OnDestroy, OnInit } from '@angular/core';
import { Panels } from '../../interface/panels.interface';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrl: './panels.component.scss'
})
export class PanelsComponent implements OnInit, OnDestroy {
  public panelsContent: Panels[];
  private translateSubscription: Subscription;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate.use('en')
    this.initializePanelsDataFromJson();
  }

  private initializePanelsDataFromJson() {
    this.translateSubscription = this.translate.get('admin.panels').subscribe((data: Panels[]) => {
      this.panelsContent = data;
    })
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }
}
