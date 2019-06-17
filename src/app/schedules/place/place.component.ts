import { Component, OnInit } from '@angular/core';
import { SchedulesService} from '../schedules.service';
import { Place } from '../../class/Place';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  place = new Place();
  places;
  title;

  constructor(private schedulesService: SchedulesService) { console.log('PlaceComponent'); }

  getTitle(title) { this.schedulesService.changeTitle(title); }

  ngOnInit() {
    this.places = this.schedulesService.getPlaces().map(res => res);
    this.schedulesService.changeTitle('');
  }


}

