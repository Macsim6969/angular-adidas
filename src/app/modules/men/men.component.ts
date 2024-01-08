import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrl: './men.component.scss'
})
export class MenComponent implements OnInit{

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.use('en')
  }
}
