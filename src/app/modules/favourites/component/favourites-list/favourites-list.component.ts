import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {storeSelectorFavourites} from "../../../../store/selectors/store.selectors";
import {ProdsFromService} from "../../../../interfaces/home.interface";
import {AuthService} from "../../../../services/auth.service";
import {Store} from "@ngrx/store";
import {StoreInterface} from "../../../../store/model/store.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrl: './favourites-list.component.scss'
})
export class FavouritesListComponent  implements OnInit, OnDestroy{
  public list: ProdsFromService[];
  public isHover: boolean[] = [];
  public isLoading: boolean = true;
  public stateInfo: boolean;

  private userSubscription: Subscription;
  private storeSubscription: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<{store: StoreInterface}>
  ) {}

  ngOnInit() {
    this.initializeDataFavouriteClothes();
  }

  private initializeDataFavouriteClothes() {
  this.userSubscription = this.authService.user.subscribe((user) => {
      this.isLoading = true;
    this.storeSubscription = this.store.select(storeSelectorFavourites).subscribe((data: ProdsFromService[]) => {
        this.getListDataAndStateInfo(data)
        this.isLoading = false;

      })
    })
  }

  private getListDataAndStateInfo(data: ProdsFromService[]) {
    if (data) {
      this.list = Object.values(data);
      this.stateInfo = false;
    } else {
      this.stateInfo = true;
    }
  }


  public openContent(name_id: string, tage: string) {
    const newRoute = name_id.replace(/ /g, '_').toLowerCase();

    const newRouterLink = ['/favourites', newRoute];

    this.router.navigate(newRouterLink, {queryParamsHandling: 'merge'}).then();
  }

  public openShop() {
    this.router.navigate(["/men"], {queryParamsHandling: 'merge'}).then();
  }

  public showHoverImage(isHovered: boolean, index: number) {
    this.isHover[index] = isHovered;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();

  }
}
