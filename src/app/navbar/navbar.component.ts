import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import 'rxjs/add/operator/mergeMap';
import { Location } from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

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
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
  ) { console.log('NavbarComponent');   }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      ).subscribe((event) => {
      this.title = event.title;
    });

    this.authenticationService.showMenuEmitter.subscribe( show => this.showMenu = show );
  }

  back() {
    this.location.back();
  }
}

