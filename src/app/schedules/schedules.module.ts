import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewComponent } from './new/new.component';
import { SchedulesComponent } from './schedules.component';
import { SchedulesService } from './schedules.service';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { PlaceComponent } from './place/place.component';

import {
  MzBadgeModule,
  MzButtonModule,
  MzCheckboxModule,
  MzCollectionModule,
  MzDatepickerModule, MzFeatureDiscoveryModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule,
  MzModalModule, MzNavbarModule,
  MzSelectModule, MzSpinnerModule,
  MzTextareaModule,
  MzTimepickerModule,
  MzToastModule,
  MzValidationModule
} from 'ngx-materialize';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UtilsModule} from './calendar/utils/module';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './calendar/calendar.component';

import {MatFormFieldModule, MatInputModule, MatStepperModule} from '@angular/material';

@NgModule({
  declarations: [
    NewComponent,
    SchedulesComponent,
    PlaceComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    MzButtonModule,
    MzIconMdiModule,
    ReactiveFormsModule,
    MzInputModule,
    MzToastModule,
    MzValidationModule,
    MzCollectionModule,
    MzSelectModule,
    MzCheckboxModule,
    MzTextareaModule,
    RecaptchaModule,
    MzIconModule,
    MzDatepickerModule,
    MzTimepickerModule,
    MzModalModule,
    FormsModule,
    MzBadgeModule,
    MzNavbarModule,
    MzSpinnerModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    UtilsModule,
    MzFeatureDiscoveryModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ SchedulesService ]
})

export class SchedulesModule { }

