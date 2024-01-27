import {Component, OnInit} from '@angular/core';
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorHoodiesData, storeSelectorShoesData} from "../../../../../store/selectors/store.selectors";
import {ActivatedRoute, Params} from "@angular/router";
import {MatIconService} from "../../../../../services/matIcon.service";

@Component({
  selector: 'app-shoes-content',
  templateUrl: './shoes-content.component.html',
  styleUrl: './shoes-content.component.scss'
})
export class ShoesContentComponent implements OnInit {
  public contentItem: any;
  public choiceColorShoes: number = 0;
  public isMorePhoto: boolean = false;

  public sizesShoes: number[] = [
    6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
  ]

  public sizesClothes: string[] = [
    'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'
  ]

  titleActive: 'Descriptions' | 'Details'
  public titleContentLeft: ['Descriptions', 'Details'] = ['Descriptions', 'Details']
  public tabsActive: number = -1;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute,
    private matIcon: MatIconService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        const targetId = params['shoes'].split('_').slice(1).map((word) => word.toUpperCase()).join(' ')
        // this.store.select(storeSelectorShoesData).subscribe((data: any[]) => {
        //   if (data.length > 0) {
        //     this.contentItem = data.find((item: any) => item.name === targetId);
        //   }
        // })
        this.store.select(storeSelectorHoodiesData).subscribe((data: any[]) => {
          if (data.length > 0) {
            this.contentItem = data.find((item: any) => item.name === targetId);
            console.log(this.contentItem)
          }
        })
      }
    )

  }

  private getDataHoodies(targetId: number) {
    console.log(targetId, 'hoodie')
    this.store.select(storeSelectorHoodiesData).subscribe((data: any[]) => {
      if (data.length > 0) {
        this.contentItem = data.find((item: any) => item.name === targetId);
        console.log(this.contentItem)
      }
    })
  }

  choiceColor(index: number) {
    this.choiceColorShoes = index;
  }


  handleTabs(string: 'Details' | 'Descriptions', index: number) {
    this.titleActive = string;
    this.tabsActive = index;


  }
}
