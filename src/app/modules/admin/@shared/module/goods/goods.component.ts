import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { storeSelectorClothesData } from '../../../../../store/selectors/store.selectors';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss'
})
export class GoodsComponent implements OnInit {
  public streamIdControl = new FormControl();
  public streamPriceControl = new FormControl();
  private allContent: any[] = [];
  public contentGoods: any[] = [];
  public errorImages: boolean[] = [];
  public changeModule: boolean[] = [];
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
      this.filterContent(value, 'id');
    });

    this.streamPriceControl.valueChanges.subscribe(value => {
      this.filterContent(value, 'price')
    })

  }

  public handleImageError(index: number) {
    this.errorImages[index] = true;
  }

  changeMode(idModule: number, isChange: boolean, id: string) {
    this.changeModule[idModule] = isChange;
    if (id === 'id') {
      this.streamId = null;
      this.filterContent(this.streamIdControl.value, id);
    }
  }

  filterContent(streamId: number, id: string) {
    if (streamId != null) {
      this.contentGoods = this.allContent.filter(item => item[id] === streamId);
      console.log(id, this.contentGoods)
    } else {
      this.contentGoods = this.allContent;
    }
  }
}
