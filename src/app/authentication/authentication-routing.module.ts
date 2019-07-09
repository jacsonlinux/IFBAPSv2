import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthenticationComponent} from './authentication.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';

const AUTHENTICATION_ROUTES: Routes = [
  {path: '', component: AuthenticationComponent,
    children : [
      {path: '',
        component: LoginComponent,
        data: {title: 'LOGIN'},
      },
      {path: 'registration',
        component: RegistrationComponent,
        data: {title: 'REGISTRATION'}
      },
      {path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {title: 'FORGOT PASSWORD'}
      },
    ] }
];
@NgModule({
  imports: [ RouterModule.forChild(AUTHENTICATION_ROUTES) ],
  exports: [ RouterModule ]
})
export class AuthenticationRoutingModule { }
