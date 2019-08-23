import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzToastService } from 'ngx-materialize';
import { SchedulesService } from '../schedules.service';
import { Schedule } from '../../class/Schedule';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs-compat/Subscription';
import { InvalidPeriod } from '../../_helpers/InvalidPeriod';

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
    start: {
      required: 'Start time is required',
      invalidPeriod: 'Start must be greater than or equal to current time'
    },
    end: {
      required: 'End time is required',
      invalidPeriod: 'Start must be greater than or equal to start time'
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

  constructor(
    private scheduleService: SchedulesService,
    private formBuilder: FormBuilder,
    private toastService: MzToastService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    console.log('NewComponent');
  }

  buildForm() {
    this.scheduleForm = this.formBuilder.group({
        start: [null, Validators.compose([
          Validators.required
        ])],
        end: [null, Validators.compose([
          Validators.required
        ])],
        activityTitle: [null, Validators.compose( [
          Validators.required
        ])]
      },
      {
        validator: InvalidPeriod(
          'start',
          'end',
          `${this.dateSchedule}`
        )
      }
    );
  }

  validatePeriod(periodForCheck, periods): boolean {
    // tslint:disable-next-line:prefer-for-of
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
    this.showForm = false;
    this.subscription.unsubscribe();
    this.scheduleService
      .newSchedule(schedule)
      .then(res => {
        if (res === true) {
          this.showForm = false;
          this.location.back();
          this.toastService.show('Registered schedule!', 3000, 'green white-text');

        } else {
          this.toastService.show(`${res}`, 5000, 'red white-text');
          this.showForm = true;
          this.scheduleForm.reset();
        }
      })
      .catch(err => err.message);
  }

  onSubmit() {
    const data = this.scheduleForm.value;
    const start = new Date(this.dateSchedule + ' ' + data.start + ':00');
    const end = new  Date(this.dateSchedule + ' ' + data.end + ':00');
    if (start >= end) {
      this.toastService.show('Start can not be greater than or equal to end', 5000, 'red white-text');
      this.scheduleForm.reset();
    } else {
      this.showForm = false;
      this.schedule.start = start;
      this.schedule.end = end;
      this.schedule.title = data.activityTitle.text;
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
              this.toastService.show('Invalid period schedule!', 5000, 'red white-text');
              this.scheduleForm.reset();
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
    this.showForm = true;
    this.scheduleService.currentDate.subscribe(date => {
      if (date === null) {
        this.location.back();
      } else {
        this.dateSchedule = date;
        this.dateSchedule = new Date(
          this.dateSchedule.getFullYear(),
          this.dateSchedule.getMonth(),
          this.dateSchedule.getDate()
        ).toDateString();
      }
    });
    this.authenticationService.user.subscribe(user => this.schedule.user = user.uid );
    this.schedule.place = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.dateSchedule);
    this.buildForm();
  }

}
