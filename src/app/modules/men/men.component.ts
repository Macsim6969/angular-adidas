import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {StateMenService} from "../../services/state-men.service";

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrl: './men.component.scss'
})
export class MenComponent implements OnInit{

  constructor(private translate: TranslateService, private stateShoesService: StateMenService) {}

  ngOnInit() {
    this.translate.use('en');
  }
}
