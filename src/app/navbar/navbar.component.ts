import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import 'rxjs/add/operator/mergeMap';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  title: string;
  showMenu = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private appService: AppService
  ) { console.log('NavbarComponent');   }

  ngOnInit() {
    console.log(window.location.href);
    /*this.router.events
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
*/
    this.appService.currentPlaceName.subscribe(res => {
      this.title = res;

      /*if (this.title === null) {
        this.appService.changePlaceName(null);
      }*/

      if (this.title === null && this.router.url === '/') {
        this.router.navigate(['home']);
      }

    });


    this.authenticationService.showMenuEmitter.subscribe( show => this.showMenu = show );

  }

  back() {
    this.location.back();
  }
}
