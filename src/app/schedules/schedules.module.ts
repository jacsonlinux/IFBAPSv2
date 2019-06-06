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
  MzIconMdiModule,
  MzInputModule,
  MzSelectModule, MzTextareaModule, MzTimepickerModule,
  MzToastModule,
  MzValidationModule
} from 'ngx-materialize';
import { ReactiveFormsModule} from '@angular/forms';

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
    MzTimepickerModule,
    MzDatepickerModule,
    MzCheckboxModule,
    MzTextareaModule
  ],
  providers: [SchedulesService]
})

export class SchedulesModule { }

