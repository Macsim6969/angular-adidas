import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { storeSelectorClothesData } from '../../../../../store/selectors/store.selectors';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss'
})
export class GoodsComponent implements OnInit {
  public allContent: any[] = [];
  errorImages: boolean[] = [];

  constructor(
    private store: Store<{ store: StoreInterface }>,
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(storeSelectorClothesData)).subscribe((data) => {
      const newArray = [data['hoodies'], data['pants'], data['shoes'], data['valentines']].reduce((acc, innerArray) => acc.concat(innerArray), []);
      this.allContent = newArray;

      this.errorImages = new Array(this.allContent.length).fill(false);
    });

  }

  public handleImageError(index: number) {
    this.errorImages[index] = true;
  }
}
