import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {StateShoesService} from "./@shared/modules/shoes/services/state-shoes.service";

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrl: './men.component.scss'
})
export class MenComponent implements OnInit{

  constructor(private translate: TranslateService, private stateShoesService: StateShoesService) {}

  ngOnInit() {
    this.translate.use('en')
  }
}
