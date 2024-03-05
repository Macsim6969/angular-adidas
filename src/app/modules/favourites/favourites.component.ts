import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ProdsFromService} from "../../interfaces/home.interface";
import {Router} from "@angular/router";
import {StoreInterface} from "../../store/model/store.model";
import {Store} from "@ngrx/store";
import {storeSelectorFavourites} from "../../store/selectors/store.selectors";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit {
  public list: ProdsFromService[];
  public isLoading: boolean = true;
  public isHover: boolean[] = [];
  constructor(
    private  store: Store<{store: StoreInterface}>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isLoading = true;
      this.store.select(storeSelectorFavourites).subscribe((data: ProdsFromService[]) => {
        this.list = Object.values(data);
        this.isLoading = false;
      })
    })
  }

  public showHoverImage(isHovered: boolean, index: number) {
    this.isHover[index] = isHovered;
  }

  public openContent(name_id: string, tage: string) {
    const newRoute = name_id.replace(/ /g, '_').toLowerCase();

    console.log('/men', tage, newRoute)
    const newRouterLink = ['/men', tage, newRoute];

    this.router.navigate(newRouterLink, {queryParamsHandling: 'merge'}).then();
  }
}
