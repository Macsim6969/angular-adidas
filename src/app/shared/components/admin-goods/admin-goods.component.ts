import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-goods',
  templateUrl: './admin-goods.component.html',
  styleUrl: './admin-goods.component.scss'
})
export class AdminGoodsComponent implements OnInit, AfterViewInit {
  public streamIdControl = new FormControl();
  public streamPriceControl = new FormControl();
  public allContent: any[] = [];
  @Input() public contentGoods: any[] = [];
  @Input() public errorImages: boolean[] = [];
  public changeModule: boolean[] = [];
  public streamId: number
  constructor() { }

  ngOnInit(): void {
    

  }
  
  ngAfterViewInit(): void {
    console.log(this.contentGoods, this.allContent, '343434')

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
