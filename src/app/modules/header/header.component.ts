import { Component } from '@angular/core';
import {MatIconService} from "../../services/matIcon.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(private matIcon: MatIconService) {
}
}
