import {Component, Input, OnInit} from '@angular/core';
import { SchedulesService} from '../schedules.service';
import { AppService } from '../../app.service';
import {Router} from '@angular/router';

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

  clickPlace(placeName) {
    // console.log(this.schedulesService.currentPlaceName.subscribe(res => console.log(res)));
    this.appService.changePlaceName(placeName);
  }

  ngOnInit() {
    this.places = this.schedulesService.getPlaces().map(res => res);
    console.log(this.router.url);

    if (this.router.url === '/schedules') {
      this.appService.changePlaceName('SCHEDULES');
    }
  }

}
