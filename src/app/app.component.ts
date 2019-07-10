import {Component, Inject, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { MzMediaService } from 'ngx-materialize';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './authentication/authentication.service';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public smallResolution: Observable<boolean>;
  public largeResolution: Observable<boolean>;

  private readonly darkThemeClass = 'dark-theme';

  constructor(
    private mediaService: MzMediaService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private titleService: Title,
    private location: Location,
    private router: Router,
    @Inject(DOCUMENT) private document
  ) {
    console.log('AppComponent');
    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    this.largeResolution = this.mediaService.isActive('gt-s'); // small screen resolution
  }

  ngOnInit() {

    this.document.body.classList.add(this.darkThemeClass);

   /* this.router.events
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
        this.titleService.setTitle(event.title);
    });*/

  }

}


