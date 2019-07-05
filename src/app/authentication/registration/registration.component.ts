import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MzToastService } from 'ngx-materialize';
import { AuthenticationService } from '../authentication.service';

import {MustMatch} from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  errorMessageResources = {
    name: {
      required: 'Name is required.',
      minlength: 'Name complete is required.',
      maxlength: 'It can not be longer than 64 characters.',
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
    }
  };

  signUpForm: FormGroup;
  showFormSignUp: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: MzToastService
  ) { console.log('RegistrationComponent'); }

  logInGoogle() {
    this.authenticationService.logInGoogle()
      .then(() => {this.router.navigate(['/home']); })
      .catch(err => err.message );
  }

  buildForm() {
    this.signUpForm = this.formBuilder.group({
      name: [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(64)
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
      ])]
    }, { validator: MustMatch('password', 'confirmPassword') });
  }

  onSubmit(token) {
    if (token) {
      const data = this.signUpForm.value;
      this.showFormSignUp = false;
      this.authenticationService
        .signUp(data)
        .then(res => {
          if (res === true) {
            this.toastService.show('Registration successfully Complete. Check your email', 5000, 'green darken-4 white-text center');
          } else {
            this.toastService.show(`${res}`, 5000, 'red darken-4 white-text center');
            this.showFormSignUp = true;
            this.buildForm();
          }
        })
        .catch(err => err.message);
    }
  }

  ngOnInit() {
    this.buildForm();
    this.showFormSignUp = true;
  }

}
