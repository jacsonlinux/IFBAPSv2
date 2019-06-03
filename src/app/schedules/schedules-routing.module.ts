import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerGuard } from '../guard/server.guard';

import { SchedulesComponent } from './schedules.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NewComponent } from './new/new.component';
import { FilterComponent } from './filter/filter.component';

const SCHEDULES_ROUTES: Routes = [
  {path: '', component: SchedulesComponent,
    children : [
      { path: '',
        component: ListComponent
      },
      { path: 'new',
        component: NewComponent,
        data: {title: 'NEW SCHEDULE'},
        canActivate: [ServerGuard]
      },
      { path: ':id',
        component: DetailComponent,
        data: {title: 'SCHEDULE DETAIL'}
      },
      { path: ':id',
        component: FilterComponent,
        data: {title: 'FILTER DETAIL'},
        canActivate: [ServerGuard]
      },
      { path: ':id/new',
        component: NewComponent,
        data: {title: 'NEW SCHEDULE'},
        canActivate: [ServerGuard]
      }
    ] }
];
@NgModule({
  imports: [ RouterModule.forChild(SCHEDULES_ROUTES) ],
  exports: [ RouterModule ]
})
export class SchedulesRoutingModule { }
