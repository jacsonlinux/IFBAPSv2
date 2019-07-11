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
    this.appService.currentPlaceName.subscribe(res => {
      this.title = res;
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
