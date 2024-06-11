import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { storeSelectorClothesData } from '../../../../../store/selectors/store.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss'
})
export class GoodsComponent implements OnInit, OnDestroy {
  public contentGoods: any[];
  public errorImages: boolean[];
  private storeClothesDataSubscription: Subscription;

  constructor(
    private store: Store<{ store: StoreInterface }>,
  ) { }

  ngOnInit(): void {
    this.storeClothesDataSubscription = this.store.pipe(select(storeSelectorClothesData)).subscribe((data) => {
      const newArray = [data['hoodies'], data['pants'], data['shoes'], data['valentines']].reduce((acc, innerArray) => acc.concat(innerArray), []);
      this.contentGoods = newArray;
      this.errorImages = new Array(newArray.length).fill(false);
      console.log(newArray, 213)
    });
  }

  ngOnDestroy(): void {
    this.storeClothesDataSubscription.unsubscribe();
  }


}
