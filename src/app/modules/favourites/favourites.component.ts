import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {StateMenService} from "../../services/state-men.service";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private stateMenService: StateMenService
  ) {
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.stateMenService.getFavouritesClothes(user.id).subscribe(data => console.log(Object.values(data)))
    })
  }
}
