import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  title: string;
  showMenu = false;
  message;

  constructor(
    private location: Location,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { console.log('NavbarComponent');   }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this.title = event.title;
      });

    this.authenticationService.showMenuEmitter.subscribe( show => this.showMenu = show );
  }

  back() {
    this.location.back();
  }
}
