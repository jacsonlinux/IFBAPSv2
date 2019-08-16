import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerGuard } from '../guard/server.guard';

import { SchedulesComponent } from './schedules.component';
import { NewComponent } from './new/new.component';
import { PlaceComponent } from './place/place.component';
import { CalendarComponent } from './calendar/calendar.component';

const SCHEDULES_ROUTES: Routes = [
  {
    path: '', component: SchedulesComponent,
    children : [
      { path: '',
        data: {title: 'SCHEDULE PLACE' },
        component: PlaceComponent,
      },
      { path: ':id/calendar',
        data: {title: 'SCHEDULE CALENDAR' },
        component: CalendarComponent
      },
      { path: ':id/new',
        component: NewComponent,
        data: {title: 'NEW SCHEDULE'},
        canActivate: [ServerGuard]
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(SCHEDULES_ROUTES) ],
  exports: [ RouterModule ]
})
export class SchedulesRoutingModule { }
