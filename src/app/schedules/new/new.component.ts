import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzToastService } from 'ngx-materialize';
import { SchedulesService } from '../schedules.service';
import { MustMatch } from '../../_helpers/must-match.validator';
import { Laboratory } from '../../class/Laboratory';
import {Schedule} from '../../class/Schedule';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  laboratory: Laboratory = new Laboratory();

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
    },
    local: {
      required: 'Sector is required',
    },
    /*name: {
      required: 'Name is required.',
      // minlength: 'O nome deve ter pelo menos 4 caracteres.',
      // maxlength: 'O nome não pode ter mais de 64 caracteres.'
    },
    email: {
      required: 'Email is required.',
      pattern: 'It should be from the domain @ ifba.edu.br.',
      email: 'Must be a valid email.'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Must be at least 6 characters.',
      maxlength: 'It can not be longer than 8 characters.',
      pattern: 'Must contain letters and numbers.'
    },
    confirmPassword: {
      required: 'Confirm password.',
      mustMatch: 'Password is not match.'
    }*/
  };

  scheduleForm: FormGroup;
  showForm: boolean;
  laboratories;

  dateSchedule;
  startTime;
  endTime;
  local;

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
    format: 'dddd, dd mmm, yyyy', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
    // formatSubmit: 'yyyy-mm-dd',   // Return value format (used to set/get value)
    formatSubmit: 'dddd, dd mmm, yyyy', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
    // formatSubmit: 'yyyy-mm-dd',   // Return value format (used to set/get value)
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };

  constructor(
    private scheduleService: SchedulesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: MzToastService,
    private autheticationService: AuthenticationService
  ) {
    this.laboratories = this.scheduleService.getLaboratories().map(res => res);
    console.log('RegistrationComponent');
  }

  buildForm() {
    this.scheduleForm = this.formBuilder.group({
      dateSchedule: [null, Validators.compose([
        Validators.required
      ])],
      startTime: [null, Validators.compose([
        Validators.required,
        // Validators.minLength(4),
        // Validators.maxLength(64)
      ])],
      endTime: [null, Validators.compose([
        Validators.required
        // Validators.minLength(4),
        // Validators.maxLength(64)
      ])],
      local: [null, Validators.compose([
        Validators.required
        // Validators.minLength(4),
        // Validators.maxLength(64)
      ])]
      // name: [null, Validators.compose([
      //   Validators.required
      //   // Validators.minLength(4),
      //   // Validators.maxLength(64)
      // ])],
      // email: [null, Validators.compose([
      //   Validators.required,
      //   Validators.pattern('[a-z0-9._%+-]+@ifba.edu.br'),
      //   Validators.email
      // ])],
      // password: [null, Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      //   Validators.minLength(6),
      //   Validators.maxLength(8)
      // ])],
      // confirmPassword: [null, Validators.compose([
      //   Validators.required
      // ])]
    }/*, { validator: MustMatch('password', 'confirmPassword') }*/);
  }

  onSubmit() {

    const data = {
      startTime: '2019-06-04T10:40:00.000Z',
      endTime: '2019-06-04T10:40:00.000Z',
      local: 'Lab. Informatica 4',
      user: 'gZzVb7Cs9HcXoX8NvtUoalOZB2R2'
    };
    this.scheduleService.newSchedule(data);
      /*.then(res => {
        /!*if (res === true) {
          this.toastService.show('Registration successfully Complete.', 5000, 'green darken-4 white-text center');
          this.router.navigate(['../schedules']);
        } else {
          this.toastService.show(`${res}`, 5000, 'red darken-4 white-text center');
          this.showForm = true;
          this.buildForm();
        }*!/
      })*/
      /*.catch(err => err.message);*/
    /*const data = this.scheduleForm.value;
    this.dateSchedule = data.dateSchedule;
    this.startTime = new Date(this.dateSchedule + ' ' + data.startTime + ':00');
    this.endTime = new  Date(this.dateSchedule + ' ' + data.endTime + ':00');
    this.local = data.local;

    this.schedule.startTime = this.startTime;
    this.schedule.endTime = this.endTime;
    this.schedule.local = this.local;

    if (this.startTime >= this.endTime) {
      this.toastService.show('The start time can not be greater than or equal to the end time!', 6000, 'red darken-4');
      this.scheduleForm.reset();
    } else {
      this.showForm = false;
      this.scheduleService
        .newSchedule(JSON.stringify(this.schedule))
        .then(res => {
          if (res === true) {
            this.toastService.show('Registration successfully Complete.', 5000, 'green darken-4 white-text center');
            this.router.navigate(['../schedules']);
          } else {
            this.toastService.show(`${res}`, 5000, 'red darken-4 white-text center');
            this.showForm = true;
            this.buildForm();
          }
        })
        .catch(err => err.message);
    }*/

  }

  ngOnInit() {
    this.buildForm();
    this.showForm = true;
    this.autheticationService.user.subscribe(user => this.schedule.user = user.uid );
  }

}

