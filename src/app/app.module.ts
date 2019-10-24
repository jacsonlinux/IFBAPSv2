import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { AppRoutingModule } from './app-routing.module';

import { ServerGuard } from './guard/server.guard';
import { AuthGuard } from './guard/auth.guard';

import {
  MzButtonModule, MzCheckboxModule, MzDropdownModule, MzFeatureDiscoveryModule, MzIconMdiModule, MzInputModule,
  MzMediaModule, MzNavbarModule,
  MzSidenavModule, MzSpinnerModule, MzSwitchModule, MzToastModule
} from 'ngx-materialize';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TechnicalGuard } from './guard/technical.guard';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MessagingService } from './messaging.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    SidenavComponent,
    TermsOfServiceComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MzIconMdiModule,
    MzButtonModule,
    MzNavbarModule,
    MzSpinnerModule,
    MzSidenavModule,
    MzToastModule,
    MzDropdownModule,
    MzMediaModule,
    MzInputModule,
    MzFeatureDiscoveryModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AppRoutingModule,
    MzSwitchModule,
    MzCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ AuthGuard, TechnicalGuard, ServerGuard, Title, MessagingService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
