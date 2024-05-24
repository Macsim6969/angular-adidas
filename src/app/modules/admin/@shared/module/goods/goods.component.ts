import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { storeSelectorClothesData } from '../../../../../store/selectors/store.selectors';
import { take, timer } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss'
})
export class GoodsComponent implements OnInit {
  streamIdControl = new FormControl();
  private allContent: any[] = [];
  public contentGoods: any[] = [];
  public errorImages: boolean[] = [];
  public isChange: boolean;
  public streamId: number
  constructor(
    private store: Store<{ store: StoreInterface }>,
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(storeSelectorClothesData)).subscribe((data) => {
      const newArray = [data['hoodies'], data['pants'], data['shoes'], data['valentines']].reduce((acc, innerArray) => acc.concat(innerArray), []);
      this.allContent = newArray;
      this.contentGoods = this.allContent;
      this.errorImages = new Array(this.allContent.length).fill(false);
    });

    this.streamIdControl.valueChanges.subscribe(value => {
      this.filterContent(value);
    });

  }

  public handleImageError(index: number) {
    this.errorImages[index] = true;
  }

  changeMode(isChange: boolean, id: string) {
    this.isChange = isChange;
    if (id === 'id' && this.streamIdControl.value != null) {
      this.filterContent(this.streamIdControl.value);
    }
  }

  filterContent(streamId: number) {
    if (streamId != null) {
      this.contentGoods = this.allContent.filter(item => item.id === streamId);
    } else {
      this.contentGoods = this.allContent;
    }
  }
}
