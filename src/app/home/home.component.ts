import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService ) { console.log('HomeComponent'); }

  ngOnInit() {
    this.authenticationService.user
      .filter(user => !!user) // filter null
      .take(1) // take first real user
      .subscribe(user => {
        if (user) { }
      });
  }

}
