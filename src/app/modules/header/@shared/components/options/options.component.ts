import {Component, OnInit} from '@angular/core';
import {MatIconService} from "../../../../../services/matIcon.service";
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent implements OnInit {

  isDropdown: boolean;

  constructor(
    private matIcon: MatIconService,
    private headerService: HeaderService
  ) {
  }

  ngOnInit() {
  }

  toggleTooltip() {
    this.isDropdown = !this.isDropdown;
  };

  closeDropdown(event){
  this.isDropdown = event;
  }
}
