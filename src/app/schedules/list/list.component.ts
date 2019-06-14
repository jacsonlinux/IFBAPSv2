import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedulesService } from '../schedules.service';
import { Schedule } from '../../class/Schedule';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  schedules;
  schedule: Schedule = new Schedule();

  constructor(
    private schedulesService: SchedulesService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { console.log('ListComponent'); }

  ngOnInit() {
    this.schedulesService.changeTitle('');
    this.schedule.place = this.activatedRoute.snapshot.paramMap.get('id');
    this.authenticationService.user.subscribe(user => {
      this.schedule.user = user.uid;
      this.schedules = this.schedulesService
        .getSchedules(this.schedule.place, this.schedule.user).map(res => res);
    });
  }

  getTitle(title) { this.schedulesService.changeTitle(title); }

}

/*'j5XeONPpvQIBEzd6JXGU' gZzVb7Cs9HcXoX8NvtUoalOZB2R2'*/
