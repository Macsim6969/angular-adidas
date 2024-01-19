import {Component, OnInit} from '@angular/core';
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorShoesData} from "../../../../../store/selectors/store.selectors";
import {ActivatedRoute, Params} from "@angular/router";
import {interval, take, timer} from "rxjs";

@Component({
  selector: 'app-shoes-content',
  templateUrl: './shoes-content.component.html',
  styleUrl: './shoes-content.component.scss'
})
export class ShoesContentComponent implements OnInit {
  public contentItem: any;
  public choiceColorShoes: number = 0;
  public isMorePhoto: boolean = false;
  public loading: boolean = false

  public sizes: number[] = [
    6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
  ]

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const targetId = params['id'].split('_').slice(1).map((word) => word.toUpperCase()).join(' ')
      this.store.select(storeSelectorShoesData).subscribe((data) => {
        if (data.length > 0) {
          this.contentItem = data.find((item: any) => item.name === targetId);
          console.log(this.contentItem)
        }
      })
    })
  }

  public choiceColor(index: number) {
    this.loading = true;
    this.choiceColorShoes = index;
    timer(2000).pipe(take(1)).subscribe(() => {
      this.loading = false;
    })
  }
}
