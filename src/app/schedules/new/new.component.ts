import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzToastService } from 'ngx-materialize';
import { SchedulesService } from '../schedules.service';
import { Schedule } from '../../class/Schedule';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  schedule: Schedule = new Schedule();

  errorMessageResources = {
    dateSchedule: {
      required: 'Date is required',
    },
    startTime: {
      required: 'Start time is required',
    },
    endTime: {
      required: 'End time is required',
    }
  };

  scheduleForm: FormGroup;
  showForm: boolean;

  dateSchedule;
  startTime;
  endTime;

  public timepickerOptions: Pickadate.TimeOptions = {
    default: 'now',
    fromnow: 0,
    twelvehour: false,
    donetext: 'OK',
    cleartext: 'CLEAR',
    canceltext: 'CLOSE',
    autoclose: false,
    ampmclickable: true
  };

  public datepickerOptions: Pickadate.DateOptions = {
    clear: 'CLEAR',
    close: 'CLOSE',
    today: 'OK',
    editable: false,
    closeOnClear: true,
    closeOnSelect: true,
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'dddd, dd mmm, yyyy',
    selectMonths: true,
    selectYears: 10
  };

  constructor(
    private scheduleService: SchedulesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: MzToastService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    console.log('NewComponent');
  }

  buildForm() {
    this.scheduleForm = this.formBuilder.group({
      dateSchedule: [null, Validators.compose([
        Validators.required
      ])],
      startTime: [null, Validators.compose([
        Validators.required,

      ])],
      endTime: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  onSubmit() {

    const data = this.scheduleForm.value;

    this.dateSchedule = data.dateSchedule;
    this.startTime = new Date(this.dateSchedule + ' ' + data.startTime + ':00');
    this.endTime = new  Date(this.dateSchedule + ' ' + data.endTime + ':00');

    this.schedule.startTime = this.startTime;
    this.schedule.endTime = this.endTime;

    if (this.startTime >= this.endTime) {
      this.toastService.show('Start can not be greater than or equal to end', 5000, 'red fontArial white-text');
      this.scheduleForm.reset();
    } else {
      this.showForm = false;
      this.scheduleService
        .newSchedule(JSON.stringify(this.schedule))
        .then(res => {
          if (res === true) {
            this.toastService.show('Registered schedule!', 3000, 'green fontArial white-text');
            this.location.back();
          } else {
            this.toastService.show(`${res}`, 3000, 'red fontArial white-text');
            this.showForm = true;
            this.buildForm();
          }
        })
        .catch(err => err.message);
    }
  }

  ngOnInit() {
    this.buildForm();
    this.showForm = true;
    this.authenticationService.user.subscribe(user => this.schedule.user = user.uid );
    this.schedule.place = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
