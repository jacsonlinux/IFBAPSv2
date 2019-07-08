import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showMenu = false;
  checkboxValue = false;

  constructor(
    public authenticationService: AuthenticationService
  ) {
    console.log('SidenavComponent');
  }
  logOut() { this.authenticationService.signOut(); }
  ngOnInit() {
    this.authenticationService.showMenuEmitter.subscribe( show => this.showMenu = show );
  }
}

