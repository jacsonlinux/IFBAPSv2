import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import 'rxjs/add/operator/filter';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private messagingService: MessagingService,
    private authenticationService: AuthenticationService,
    private appService: AppService,
    private router: Router ) {
    console.log('HomeComponent');
  }

  ngOnInit() {
    this.authenticationService.user
      .filter(user => !!user) // filter null
      .take(1) // take first real user
      .subscribe(user => {
        if (user) {
          this.messagingService.getPermission (user);
          this.messagingService.monitorRefresh (user);
          this.messagingService.receiveMessages ();
        }
      });
    if (this.router.url === '/home') {
      this.appService.changePlaceTitle('HOME');
    }
  }

}
