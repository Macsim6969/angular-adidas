import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeaderService} from "../header/@shared/services/header.service";
import {take, timer} from "rxjs";

@Component({
  selector: 'app-choice-languages',
  templateUrl: './choice-languages.component.html',
  styleUrl: './choice-languages.component.scss'
})
export class ChoiceLanguagesComponent implements OnInit{

  @ViewChild('popup', {read: ElementRef}) popupRef: ElementRef;
 constructor(
   private headerService: HeaderService
 ) {}

  ngOnInit() {
  }

  closePopup(){
   console.log(this.popupRef)
   this.popupRef.nativeElement.classList.add('closest')
   timer(1000).pipe(take(1)).subscribe(() =>{
     this.headerService.handleDropdown(false);
   })
  }
}
