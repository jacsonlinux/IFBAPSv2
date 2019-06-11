import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { SchedulesComponent } from './schedules.component';
import { FilterComponent } from './filter/filter.component';
import { SchedulesService } from './schedules.service';
import { SchedulesRoutingModule } from './schedules-routing.module';
import {
  MzButtonModule, MzCheckboxModule,
  MzCollectionModule, MzDatepickerModule,
  MzIconMdiModule, MzIconModule,
  MzInputModule,
  MzSelectModule, MzTextareaModule, MzTimepickerModule,
  MzToastModule,
  MzValidationModule
} from 'ngx-materialize';
import { ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({
  declarations: [
    DetailComponent,
    ListComponent,
    NewComponent,
    SchedulesComponent,
    FilterComponent
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'pt-br'},
    SchedulesService
  ]
})

export class SchedulesModule { }

