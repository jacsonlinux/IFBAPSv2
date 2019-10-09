import { Component, OnInit } from '@angular/core';
import {MaintenanceService} from '../maintenance.service';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {

  laboratories;

  show: boolean;

  constructor(
    public authenticationService: AuthenticationService,
    private maintenanceService: MaintenanceService,
    private appService: AppService,
    private router: Router) {
    console.log('PlaceComponent');
  }

  clickPlace(place) {
    this.appService.changePlaceTitle(`${place}`);
  }

  ngOnInit() {
    this.laboratories = this.maintenanceService.getLaboratories().map(res => res);
    this.appService.changePlaceTitle('LABORATORIES');
    /*if (this.router.url === '/maintenance') {
      this.appService.changePlaceTitle('LABORATORIES');
    }*/
  }

}
