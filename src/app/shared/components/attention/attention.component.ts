import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrl: './attention.component.scss'
})
export class AttentionComponent {

  constructor(private router: Router) {}

  public openShop(){
    this.router.navigate(["/men"], {queryParamsHandling: 'merge'}).then();
  }
}
