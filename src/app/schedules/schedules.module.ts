import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { SchedulesComponent } from './schedules.component';
import { FilterComponent } from './filter/filter.component';
import { SchedulesService } from './schedules.service';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { PlaceComponent } from './place/place.component';

import {
  MzBadgeModule,
  MzButtonModule,
  MzCheckboxModule,
  MzCollectionModule,
  MzDatepickerModule,
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
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    DetailComponent,
    ListComponent,
    NewComponent,
    SchedulesComponent,
    FilterComponent,
    PlaceComponent,
    NavbarComponent
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
    MzSpinnerModule
  ],
  providers: [
    SchedulesService
  ]
})

export class SchedulesModule { }

