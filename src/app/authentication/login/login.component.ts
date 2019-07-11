import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzToastService } from 'ngx-materialize';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showFormLogin: boolean;
  logInForm: FormGroup;
  errorMessageResources = {
    email: {
      required: 'Email is required.',
      pattern: 'It should be from the domain @ ifba.edu.br.',
      email: 'Must be a valid email.'
    },
    password: {required: 'Password is required.'}
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: MzToastService
  ) {
    console.log('LoginComponent');
    this.showFormLogin = false;
    this.authenticationService.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['home']).catch(err => err.message);
      } else {
        this.showFormLogin = true;
      }
    });
  }

  logInGoogle() {
    this.authenticationService.logInGoogle()
      .then(() => {this.router.navigate(['/home']); })
      .catch(err => err.message );
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

  onSubmit(token) {
    if (token) {
      const data = this.logInForm.value;
      this.showFormLogin = false;
      this.authenticationService
        .logIn(data)
        .then(res => {
          if (!res.uid) {
            this.buildForm();
            this.showFormLogin = true;
            this.toastService.show(`${res}`, 5000, 'red darken-4 white-text center');
          } else if (!res.emailVerified) {
            res.sendEmailVerification()
              .then(() => {
                this.authenticationService.signOut();
              })
              .catch(err => err.message);
            this.buildForm();
            this.showFormLogin = true;
            this.toastService.show('The email was not verified. Check the email' +
              ' before logging in.', 5000, 'red darken-4 white-text center');
          }
        })
        .catch(err => err.message);
    }
  }

  ngOnInit() {
    this.buildForm();
    this.showFormLogin = true;
  }
}
