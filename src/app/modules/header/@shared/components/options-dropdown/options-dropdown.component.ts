import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-options-dropdown',
  templateUrl: './options-dropdown.component.html',
  styleUrl: './options-dropdown.component.scss'
})
export class OptionsDropdownComponent implements OnInit, OnDestroy {
  @Output() closeDropdown: EventEmitter<boolean> = new EventEmitter<boolean>();
  public userSub: Subscription;
  public isAuthenticated: boolean = false

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.initializeAuthenticatedDataUser();
  }

  private initializeAuthenticatedDataUser() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  public openAuthPage() {
    this.router.navigate(['/auth'], {queryParamsHandling: 'merge'}).then();
    this.closeDropdown.emit(false);
  }

  public openPopup() {
    this.headerService._isDropdown = true;
    this.closeDropdown.emit(false);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/auth'], {queryParamsHandling: 'merge'}).then();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
