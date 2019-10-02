import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../schedules.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  places;

  constructor( private schedulesService: SchedulesService, private appService: AppService, private router: Router) {
    console.log('PlaceComponent');
  }

  clickPlace(placeCode) {
    this.appService.changePlaceTitle(placeCode);
  }

  ngOnInit() {
    this.places = this.schedulesService.getPlaces().map(res => res);
    // if (this.router.url === '/schedules') {
      this.appService.changePlaceTitle('Places');
    // }
  }

}
