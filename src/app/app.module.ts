import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { AppRoutingModule } from './app-routing.module';

import {ServerGuard} from './guard/server.guard';
import { AuthGuard } from './guard/auth.guard';

import {
  MzButtonModule, MzDropdownModule, MzFeatureDiscoveryModule, MzIconMdiModule, MzInputModule,
  MzMediaModule, MzNavbarModule,
  MzSidenavModule, MzSpinnerModule
} from 'ngx-materialize';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    SidenavComponent,
    TermsOfServiceComponent,
    UnauthorizedComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    BrowserModule,
    BrowserAnimationsModule,
    MzIconMdiModule,
    MzButtonModule,
    MzNavbarModule,
    MzSpinnerModule,
    MzSidenavModule,
    MzDropdownModule,
    MzMediaModule,
    MzFeatureDiscoveryModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AppRoutingModule,
    MzInputModule
  ],
  providers: [ AuthGuard, ServerGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
