import { Component, OnInit } from '@angular/core';
import {MaintenanceService} from "../maintenance.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  places;

  constructor(
    private maintenanceService: MaintenanceService,
    private appService: AppService,
    private router: Router) {
    console.log('PlaceComponent');
  }

  clickPlace(place) {
    this.appService.changePlaceTitle(`${place}`);
  }

  ngOnInit() {
    this.places = this.maintenanceService.getPlaces().map(res => res);
    // if (this.router.url === '/schedules') {
    this.appService.changePlaceTitle('Places');
    // }
  }
}
