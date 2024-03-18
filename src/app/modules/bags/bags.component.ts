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
  public totalPrice: number;

  public choicePriceArray: number[] = [1,2,3,4,5,6,7,8,9,10];

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
     this.initializeReadebleData(data)
    })
  }

  private initializeReadebleData(data: Bags[]){
    const mergedItemsArray = Object.values(data).reduce((acc, item) => {
      const existingItem = acc.find(accItem => accItem.name === item.name && accItem.activeSize === item.activeSize);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        acc.push({ ...item, count: 1 });
      }
      return acc;
    }, []);
    this.bags = mergedItemsArray;
    console.log(mergedItemsArray);
  }


  public removeFromBags(id: number){
    const entries = Object.entries(this.originalBags);
    const foundEntry = entries.find(([key, value]) => value.id === id);
    const [key, value] = foundEntry;
    const objectKeyToRemove = key;
    this.stateMenService.removeClothesFromBags(this.user.id, objectKeyToRemove).add(() =>{
      this.getDataClothesFromBags();
    })
  }

 public choiceCountClothes(count: number, id: number) {
   const product = this.bags.find(p => p.id === id);
   if (product) {
     product.count = count;
   }

   const uniqueItems: Bags[] = [];
   this.bags.forEach(item => {
     if (item.id === id && !uniqueItems.some(uniqueItem => uniqueItem.id === item.id && uniqueItem.activeSize === item.activeSize)) {
       uniqueItems.push(item);
     }
   });

   const duplicateItems = [...uniqueItems];
   for (let i = 1; i < count; i++) {
     this.bags.push(...duplicateItems);
   }

   this.totalPrice = Object.values(this.bags).reduce((left, right ) => {
     return  left + right.price
   }, 0)

   this.initializeReadebleData(this.bags);
 }
  ngOnDestroy() {
  }
}
