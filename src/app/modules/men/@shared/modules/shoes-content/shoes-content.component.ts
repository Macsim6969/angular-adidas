import {Component, OnInit} from '@angular/core';
import {StoreInterface} from "../../../../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorShoesData} from "../../../../../store/selectors/store.selectors";

@Component({
  selector: 'app-shoes-content',
  templateUrl: './shoes-content.component.html',
  styleUrl: './shoes-content.component.scss'
})
export class ShoesContentComponent implements OnInit {
  contentItem: any

  constructor(
    private store: Store<{ store: StoreInterface }>
  ) {
  }

  ngOnInit() {
    const targetId: number = +localStorage.getItem('id-shoes');
    this.store.select(storeSelectorShoesData).subscribe((data) => {
      this.contentItem = data.find((item: any) => item.id === targetId);
      console.log(data, targetId)
    })
  }
}
