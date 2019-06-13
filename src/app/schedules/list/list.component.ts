import { Component, OnInit } from '@angular/core';
import {SchedulesService} from '../schedules.service';
import {Schedule} from '../../class/Schedule';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  schedules;
  schedule = new Schedule();

  constructor(private schedulesService: SchedulesService) {
    console.log('ListComponent');
    this.schedules = this.schedulesService.getSchedules().map(res => res);
  }

  ngOnInit() { this.schedulesService.changeTitle(''); }

  getTitle(title) { this.schedulesService.changeTitle(title); }

}
