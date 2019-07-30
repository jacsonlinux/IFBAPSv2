import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    private authenticationService: AuthenticationService
  ) {}

  onSubmit(token) {
    // pesquisar toastService
    // ver no materialize
    if (token) {
      this.showFormForgotPassword = false;
      const email = this.forgotPasswordForm.value.email;
      this.authenticationService.resetPassword(email)
        .then(res => {
          this.buildForm();
          this.showFormForgotPassword = true;
          console.log(res);
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
