import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateMenService} from "../../services/state-men.service";
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {User} from "../auth/auth.model";
import {Bags} from "../../interfaces/bags.interface";
import {MatIconService} from "../../services/matIcon.service";

@Component({
  selector: 'app-bags',
  templateUrl: './bags.component.html',
  styleUrl: './bags.component.scss'
})
export class BagsComponent implements OnInit, OnDestroy {
  private user: User;
  private originalBags: Bags[];
  public bags: Bags[];
  public count: number;

  constructor(
    private stateMenService: StateMenService,
    private authService: AuthService,
    private matIcon: MatIconService
  ) {
  }

  ngOnInit() {
   this.initializeUserData();
    this.getDataClothesFromBags();
  }

  private initializeUserData(){
    this.authService.user.pipe(take(1)).subscribe((user: User) => {
      this.user = user;
    })
  }

  private getDataClothesFromBags(){
    this.stateMenService.getClothesFromBags(this.user.id).subscribe((data: Bags[]) =>{
      this.originalBags = data;
      this.bags = Object.values(data);
      console.log(data)
    })
  }


  public removeFromBags(id: number){
    const entries = Object.entries(this.originalBags);
    const foundEntry = entries.find(([key, value]) => value.id === id);
    const [key, value] = foundEntry;
    const objectKeyToRemove = key;
    this.stateMenService.removeClothesFromBags(this.user.id, objectKeyToRemove)
  }
  ngOnDestroy() {
  }
}
