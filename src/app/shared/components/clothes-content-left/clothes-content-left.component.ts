import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatIconService} from "../../../services/matIcon.service";
import {ClothesContentService} from "../../../services/clothes-content.service";
import {Observable} from "rxjs";

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
  public choiceColorShoes$: Observable<number>;

  constructor(
    private router: Router,
    private matIcon: MatIconService,
    private clothesContentService: ClothesContentService
  ) {
  }

  ngOnInit() {
    this.choiceColorShoes$ = this.clothesContentService._choiceColorShoes$;

  }

  public backRoute() {
    this.router.navigate(['/men/' + this.dataParam], {queryParamsHandling: 'merge'}).then();
  }

  public handleTabs(string: 'Details' | 'Descriptions', index: number) {
    this.titleActive = string;
    this.tabsActive = index;
  }

  ngOnDestroy() {
  }

  private streamchoiceColorShoes() {

  }

}
