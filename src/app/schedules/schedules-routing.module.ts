import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerGuard } from '../guard/server.guard';

import { SchedulesComponent } from './schedules.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NewComponent } from './new/new.component';
import { FilterComponent } from './filter/filter.component';
import { PlaceComponent } from './place/place.component';

const SCHEDULES_ROUTES: Routes = [
  {
    path: '', component: SchedulesComponent,
    children : [
      { path: '',
        data: {title: 'SCHEDULE PLACE' },
        component: PlaceComponent,
      },
      { path: ':id/list',
        data: {title: 'ALL SCHEDULE' },
        component: ListComponent
      },
      { path: ':id/new',
        component: NewComponent,
        data: {title: 'NEW SCHEDULE'},
        canActivate: [ServerGuard]
      },
      { path: 'detail/:id',
        component: DetailComponent,
        data: {title: 'SCHEDULE DETAIL'}
      },
      { path: ':id/filter',
        component: FilterComponent,
        data: {title: 'MY SCHEDULE'},
        canActivate: [ServerGuard]
      },
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(SCHEDULES_ROUTES) ],
  exports: [ RouterModule ]
})
export class SchedulesRoutingModule { }
