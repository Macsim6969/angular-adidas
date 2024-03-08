import {Component, OnInit, ViewChildren} from '@angular/core';
import {DragScrollComponent} from "ngx-drag-scroll";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../../store/model/store.model";
import {storeSelectorClothesData, storeSelectorHoodiesData} from "../../../../../store/selectors/store.selectors";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-slider-news',
  templateUrl: './slider-news.component.html',
  styleUrl: './slider-news.component.scss'
})
export class SliderNewsComponent implements OnInit {
  @ViewChildren('nav', {read: DragScrollComponent}) dragScroll: DragScrollComponent
  newsList: any[];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.store.select(storeSelectorClothesData).subscribe(data => {
      this.newsList = data['valentines'];
    })
  }

  openNewCollection(id: string) {
    const newRoute = id.replace(/ /g, '_').toLowerCase();
    const currentMenu = this.route.snapshot.params['menu'];
    const newRouterLink = 'men/valentines/' + newRoute;
    this.router.navigate([newRouterLink], {queryParamsHandling: 'merge'}).then();
  }
}
