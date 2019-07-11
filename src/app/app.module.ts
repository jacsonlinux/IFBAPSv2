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
  MzSidenavModule, MzSpinnerModule, MzSwitchModule
} from 'ngx-materialize';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    SidenavComponent,
    TermsOfServiceComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MzIconMdiModule,
    MzButtonModule,
    MzNavbarModule,
    MzSpinnerModule,
    MzSidenavModule,
    MzDropdownModule,
    MzMediaModule,
    MzInputModule,
    MzFeatureDiscoveryModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AppRoutingModule,
    MzSwitchModule,
    MzCheckboxModule,
    FormsModule
  ],
  providers: [ AuthGuard, ServerGuard, Title],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
