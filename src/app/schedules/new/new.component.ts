import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MzToastService } from 'ngx-materialize';
import { SchedulesService } from '../schedules.service';
import { MustMatch } from '../../_helpers/must-match.validator';
import { Laboratory } from '../../class/Laboratory';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  laboratory: Laboratory = new Laboratory();

  errorMessageResources = {
    date: {
      required: 'Date is required',
      pattern: 'Date invalid!'
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

  public timepickerOptions: Pickadate.TimeOptions = {
    default: 'now',
    fromnow: 0,
    twelvehour: false,
    donetext: 'OK',
    cleartext: 'CLEAR',
    canceltext: 'CLOSE',
    autoclose: false,
    ampmclickable: true,
  };

  public datepickerOptions: Pickadate.DateOptions = {

    clear: 'CLEAR',
    close: 'CLOSE',
    today: 'OK',
    editable: false,
    closeOnClear: true,
    closeOnSelect: true,
    format: 'dddd, dd mmm, yyyy', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
    formatSubmit: 'yyyy-mm-dd',   // Return value format (used to set/get value)
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };

  constructor(
    private scheduleService: SchedulesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: MzToastService
  ) {
    this.laboratories = this.scheduleService.getLaboratories().map(res => res);
    console.log('RegistrationComponent');
  }

  buildForm() {
    this.scheduleForm = this.formBuilder.group({
      date: [null, Validators.compose([
        Validators.required,
        Validators.pattern('')
        // Validators.minLength(4),
        // Validators.maxLength(64)
      ])],



      startTime: [null, Validators.compose([
        Validators.required
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
      /*,
      name: [null, Validators.compose([
        Validators.required
        // Validators.minLength(4),
        // Validators.maxLength(64)
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@ifba.edu.br'),
        Validators.email
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(8)
      ])],
      confirmPassword: [null, Validators.compose([
        Validators.required
      ])]*/
    }/*, { validator: MustMatch('password', 'confirmPassword') }*/);
  }

  onSubmit() {
    const data = this.scheduleForm.value;
    console.log(data.date);
    console.log(data.startTime);
    console.log(data.endTime);
    // console.log(data.begin.toLocaleString('en-us', {  hour: 'numeric', minute: 'numeric', hour12: true }));
    // this.showForm = false;
    // this.scheduleService
    //   .signUp(data)
    //   .then(res => {
    //     if (res === true) {
    //       this.toastService.show('Registration successfully Complete. Check your email', 5000, 'green darken-4 white-text center');
    //     } else {
    //       this.toastService.show(`${res}`, 5000, 'red darken-4 white-text center');
    //       this.showFormSignUp = true;
    //       this.buildForm();
    //     }
    //   })
    //   .catch(err => err.message);

  }

  ngOnInit() {
    this.buildForm();
    this.showForm = true;
  }
}

