import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerGuard } from '../guard/server.guard';

import {MaintenanceComponent} from "./maintenance.component";
import {RepairComponent} from "./repair/repair.component";
import {PlaceComponent} from "./place/place.component";

const MAINTENANCE_ROUTES: Routes = [
  {
    path: '', component: MaintenanceComponent,
    children : [
      { path: '',
        data: {title: 'PLACE' },
        component: PlaceComponent
      },
      { path: ':id',
        data: {title: 'REPAIR' },
        component: RepairComponent
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(MAINTENANCE_ROUTES) ],
  exports: [ RouterModule ]
})
export class MaintenanceRoutingModule { }
