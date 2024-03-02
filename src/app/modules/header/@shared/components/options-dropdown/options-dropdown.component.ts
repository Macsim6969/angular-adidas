import {Component, EventEmitter, Output} from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-options-dropdown',
  templateUrl: './options-dropdown.component.html',
  styleUrl: './options-dropdown.component.scss'
})
export class OptionsDropdownComponent {
  @Output() closeDropdown: EventEmitter<boolean> = new EventEmitter<boolean>();
 constructor(
   private headerService: HeaderService,
   private router: Router
 ) {}

  openAuthPage(){
   this.router.navigate(['/auth'], {queryParamsHandling: 'merge'}).then();
   this.closeDropdown.emit(false) ;
  }
  openPopup(){
   this.headerService.handleDropdown(true);
   this.closeDropdown.emit(false)
  }

    protected readonly console = console;
}
