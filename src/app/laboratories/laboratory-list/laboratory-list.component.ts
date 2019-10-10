import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {LaboratoriesService} from '../laboratories.service';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-laboratory-list',
  templateUrl: './laboratory-list.component.html',
  styleUrls: ['./laboratory-list.component.scss']
})
export class LaboratoryListComponent implements OnInit {

  laboratories;

  show: boolean;

  constructor(
    public authenticationService: AuthenticationService,
    private laboratoriesService: LaboratoriesService,
    private appService: AppService,
    private router: Router) {
    console.log('PlaceComponent');
  }

  clickPlace(place) {
    this.appService.changePlaceTitle(`${place}`);
  }

  ngOnInit() {
    this.laboratories = this.laboratoriesService.getLaboratories().map(res => res);
    this.appService.changePlaceTitle('LABORATORIES');
    /*if (this.router.url === '/maintenance') {
      this.appService.changePlaceTitle('LABORATORIES');
    }*/
  }

}
