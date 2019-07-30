import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  passReset: boolean;
  userForm: any;
  showFormLogin: boolean;
  logInForm: FormGroup;
  errorMessageResources = {
    email: {
      required: 'Email is required.',
      pattern: 'It should be from the domain @ ifba.edu.br.',
      email: 'Must be a valid email.'
    }
  };
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  resetPassword() {
    this.authenticationService.resetPassword(this.userForm.value.email).then(() => this.passReset = true);
  }

  buildForm() {
    this.logInForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@ifba.edu.br'),
        Validators.email
      ])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.buildForm();
    this.showFormLogin = true;
  }

}
