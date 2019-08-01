import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MzToastService} from 'ngx-materialize';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  showFormForgotPassword: boolean;
  forgotPasswordForm: FormGroup;
  errorMessageResources = {
    email: {
      required: 'Email is required.',
      pattern: 'It should be from the domain @ ifba.edu.br.',
      email: 'Must be a valid email.'
    }
  };
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastService: MzToastService
  ) {}
  onSubmit(token) {

    if (token) {
      this.showFormForgotPassword = false;
      const email = this.forgotPasswordForm.value.email;
      this.authenticationService.resetPassword(email)
        .then(res => {
          this.buildForm();
          this.showFormForgotPassword = true;
          console.log(res);
          if (res == null) {
            this.toastService.show('Check your e-mail', 5000, 'green darken-4 white-text center');
          } else {
            this.toastService.show('Unregistered User', 5000, 'red darken-4 white-text center');
          }
        })
        .catch(err => err.message);
    }
  }

  buildForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@ifba.edu.br'),
        Validators.email
      ])]
    });
  }

  ngOnInit() {
    this.buildForm();
    this.showFormForgotPassword = true;
  }

}
