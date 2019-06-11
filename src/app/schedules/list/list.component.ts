import { Component, OnInit } from '@angular/core';
import {SchedulesService} from '../schedules.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  schedules;

  constructor(private schedulesService: SchedulesService) {
    console.log('ListComponent');
    this.schedules = this.schedulesService.getSchedules().map(res => res);
    console.log(this.schedules);
  }

  ngOnInit() { this.schedulesService.changeTitle('');
  }

  getTitle(title) {
    this.schedulesService.changeTitle(title);
  }

}
