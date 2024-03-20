import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateMenService} from "../../services/state-men.service";
import {AuthService} from "../../services/auth.service";
import {Subscription, take} from "rxjs";
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
  public totalPrice: number;

  public choicePriceArray: number[] = [1,2,3,4,5,6,7,8,9,10];

  private getClothesFromBagsSubscription: Subscription;

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

  private initializeUserData() {
    this.authService.user.pipe(take(1)).subscribe((user: User) => {
      this.user = user;
    });
  }

  private getDataClothesFromBags() {
    this.getClothesFromBagsSubscription = this.stateMenService.getClothesFromBags(this.user.id).subscribe((data: Bags[]) => {
      data ? this.isDataClothesNotEmpty(data) : this.bags = null;
    });
  }

  private isDataClothesNotEmpty(data){
    this.originalBags = data;
    this.bags = Object.values(data);
    this.bags.length ? this.initializeTotalPrice() : null;
  }

  private initializeTotalPrice() {
    this.totalPrice = this.bags.reduce((acc, item) => acc + (item.price * item.count || item.price), 0);
  }

  public choiceCountClothes(count: number, id: number) {
    const product = this.bags.find(p => p.id === id);
    product ? product.count = count : null;

    this.initializeTotalPrice();
    this.initializeReadebleData();
  }

  private initializeReadebleData() {
    const mergedItemsArray = Object.values(this.bags).reduce((acc, item) => {
      const existingItem = acc.find(accItem => accItem.name === item.name && accItem.activeSize === item.activeSize);
      if (existingItem) {
        existingItem.count += item.count;
      } else {
        acc.push({...item});
      }
      return acc;
    }, []);
    this.bags = mergedItemsArray;
    this.stateMenService.addAllClothesToBags(this.user.id, mergedItemsArray);
  }
  public removeFromBags(id: number, size: string| number){
   this.bags = Object.values(this.originalBags).filter(item => item.id !== id || item.activeSize !== size)
    this.stateMenService.addAllClothesToBags(this.user.id, this.bags).add(() =>{
      this.getDataClothesFromBags();
    })
  }

  ngOnDestroy() {
    this.getClothesFromBagsSubscription.unsubscribe();
  }

}
