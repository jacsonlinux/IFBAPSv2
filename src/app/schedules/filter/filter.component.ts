import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {MzModalService, MzToastService} from 'ngx-materialize';
import {SchedulesService} from '../schedules.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Schedule} from '../../class/Schedule';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  schedule: Schedule = new Schedule();
  schedules;
  scheduleID: string;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: 0.5,
    startingTop: '30%',
    endingTop: '20%'
  };

  constructor(
    private location: Location,
    private modalService: MzModalService,
    private toastService: MzToastService,
    private schedulesService: SchedulesService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { console.log('FilterComponent'); }

  optionModalValue(value: boolean) {
    if (value) {
      this.schedulesService.deleteSchedule(this.scheduleID)
        .then(res => { if (res) {
          this.toastService.show('Scheduling deleted!', 3000, 'red fontArial white-text');
        }})
        .catch(err => err.message);
    }
  }

  ngOnInit() {
    this.schedule.place = this.activatedRoute.snapshot.paramMap.get('id');
    this.authenticationService.user.subscribe(user => {
      this.schedule.user = user.uid;
      this.schedules = this.schedulesService.getSchedulesUser(this.schedule.place, this.schedule.user).map(res => res);
    });
  }

}
