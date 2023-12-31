import {Component, EventEmitter, Output} from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-options-dropdown',
  templateUrl: './options-dropdown.component.html',
  styleUrl: './options-dropdown.component.scss'
})
export class OptionsDropdownComponent {
  @Output() closeDropdown: EventEmitter<boolean> = new EventEmitter<boolean>();
 constructor(
   private headerService: HeaderService
 ) {}

  openPopup(){
   this.headerService.handleDropdown(true);
   this.closeDropdown.emit(false)
  }
}
