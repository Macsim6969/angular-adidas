import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatIconService} from "../../../services/matIcon.service";
import {ClothesContentService} from "../../../services/clothes-content.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-clothes-content-left',
  templateUrl: './clothes-content-left.component.html',
  styleUrl: './clothes-content-left.component.scss'
})
export class ClothesContentLeftComponent implements OnInit, OnDestroy {
  @Input() public contentItem: any;
  public isMorePhoto: boolean = false;
  public dataParam: string;
  public titleContentLeft: ['Descriptions', 'Details'] = ['Descriptions', 'Details'];
  public titleActive: 'Descriptions' | 'Details'
  public tabsActive: number = -1;
  public choiceColorShoes: number = 0;

  private choiceColorShoesSubscription: Subscription;

  constructor(
    private router: Router,
    private matIcon: MatIconService,
    private clothesContentService: ClothesContentService
  ) {
  }

  ngOnInit() {
    this.streamChoiceColorShoes();
  }

  public backRoute() {
    this.router.navigate(['/men/' + this.dataParam], {queryParamsHandling: 'merge'}).then();
  }

  public handleTabs(string: 'Details' | 'Descriptions', index: number) {
    this.titleActive = string;
    this.tabsActive = index;
  }

  ngOnDestroy() {
    this.choiceColorShoesSubscription.unsubscribe();
  }

  private streamChoiceColorShoes() {
   this.choiceColorShoesSubscription = this.clothesContentService._choiceColorShoes$.subscribe((data) => {
      this.choiceColorShoes = data;
    });
  };

}
