import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import {
  MzButtonModule, MzDropdownModule, MzFeatureDiscoveryModule,
  MzIconMdiModule,
  MzInputModule,
  MzMediaModule, MzNavbarModule,
  MzSidenavModule, MzSpinnerModule,
  MzToastModule,
  MzValidationModule
} from 'ngx-materialize';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RecaptchaModule} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MzIconMdiModule,
    MzDropdownModule,
    MzButtonModule,
    MzInputModule,
    MzValidationModule,
    MzNavbarModule,
    MzSpinnerModule,
    MzSidenavModule,
    MzMediaModule,
    MzToastModule,
    MzFeatureDiscoveryModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  declarations: [
    AuthenticationComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent
  ],
  providers: [ AuthenticationService ],
})
export class AuthenticationModule { }
