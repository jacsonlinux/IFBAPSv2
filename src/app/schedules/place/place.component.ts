import { Component, OnInit } from '@angular/core';
import { SchedulesService} from '../schedules.service';
import { Place } from '../../class/Place';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  places;
  place = new Place();

  constructor(private schedulesService: SchedulesService) {
    console.log('PlaceComponent');
    this.places = this.schedulesService.getPlaces().map(res => res);
  }

  ngOnInit() { this.schedulesService.changeTitle(''); }

  getTitle(title) { this.schedulesService.changeTitle(title); }

}

