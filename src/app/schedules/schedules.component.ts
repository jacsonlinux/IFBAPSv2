import { Component, OnInit } from '@angular/core';
import {SchedulesService} from './schedules.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  title;

  constructor(private schedulesService: SchedulesService) { }

  new() {
    this.schedulesService.newScheduleTest();
  }

  ngOnInit() { this.schedulesService.currentTitle.subscribe(title => this.title = title); }

}
