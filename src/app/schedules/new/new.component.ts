import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzToastService } from 'ngx-materialize';
import { SchedulesService } from '../schedules.service';
import { Schedule } from '../../class/Schedule';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {

  activityOptions = [
    { text: 'Culture,music, arts, literature' },
    { text: 'Health care, pharmaceutical, and medical sector' },
    { text: 'Manufacturing industries' },
    { text: 'Telecommunications and information technology' },
    { text: 'Transport, shipping, trucking and infrastructures' },
    { text: 'Financial services' },
    { text: 'Research, science, biotechnology, etc.' },
    { text: 'Media and film industry' },
  ];

  schedule = new Schedule();

  errorMessageResources = {
    dateSchedule: {
      required: 'Date is required',
    },
    start: {
      required: 'Start time is required',
    },
    end: {
      required: 'End time is required',
    },
    title: {
      required: 'Title is required',
      maxlength: 'It can not be longer than 40 characters.',
    },
    activityTitle: {
      required: 'Activity is required.',
    },
  };

  scheduleForm: FormGroup;
  showForm: boolean;

  dateSchedule;
  start;
  end;

  subscription: Subscription;

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
      start: [null, Validators.compose([
        Validators.required,

      ])],
      end: [null, Validators.compose([
        Validators.required
      ])],
      activityTitle: ['', Validators.compose( [
        Validators.required
      ])]
    });
  }

  validatePeriod(periodForCheck, periods): boolean {
    for (let i = 0; i < periods.length; i++) {
      const period = periods[i];
      if (period.start < periodForCheck.start && period.end > periodForCheck.start) {
        return false;
      }
      if (period.start > periodForCheck.start && period.start < periodForCheck.end) {
        return false;
      }
    }
    return true;
  }

  newSchedule(schedule): void {
    this.subscription.unsubscribe();
    this.scheduleService
      .newSchedule(schedule)
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

  onSubmit() {
    const data = this.scheduleForm.value;
    this.dateSchedule = data.dateSchedule;
    this.start = new Date(this.dateSchedule + ' ' + data.start + ':00');
    this.end = new  Date(this.dateSchedule + ' ' + data.end + ':00');
    this.schedule.start = this.start;
    this.schedule.end = this.end;
    this.schedule.title = data.activityTitle.text;
    if (this.start >= this.end) {
      this.toastService.show('Start can not be greater than or equal to end', 5000, 'red fontArial white-text');
      this.scheduleForm.reset();
    } else {
      this.showForm = false;
      const schedule = {
        end: this.schedule.end,
        place: this.schedule.place,
        start: this.schedule.start,
        user: this.schedule.user,
        title: this.schedule.title
      };
      this.subscription = this.scheduleService.validateSchedule(schedule)
        .subscribe(schedules => {
        if (schedules.length === 0) {
          this.newSchedule(schedule);
        } else {
          const periods = [];
          for (const entry of schedules) {
            periods.push({
              start: entry.data.start.toDate(),
              end: entry.data.end.toDate()
            });
          }
          const periodForCheck = {
            start: schedule.start,
            end: schedule.end
          };
          const valid = this.validatePeriod(periodForCheck, periods);
          if (valid) {
            this.newSchedule(schedule);
          } else {
            this.subscription.unsubscribe();
            this.toastService.show('Invalid period schedule!', 3000, 'red fontArial white-text');
            this.showForm = true;
          }
        }
      });
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.buildForm();
    this.showForm = true;
    this.authenticationService.user.subscribe(user => this.schedule.user = user.uid );
    this.schedule.place = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
