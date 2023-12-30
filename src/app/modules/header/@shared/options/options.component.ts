import { Component } from '@angular/core';
import {MatIconService} from "../../../../services/matIcon.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent {

  constructor(private matIcon: MatIconService) {}
}
