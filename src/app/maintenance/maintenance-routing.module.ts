import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MaintenanceComponent} from './maintenance.component';
import {AuthGuard} from '../guard/auth.guard';
import {LaboratoryComponent} from './laboratory/laboratory.component';
import {RequestRepairComponent} from './request-repair/request-repair.component';
import {ComputerListComponent} from './computer-list/computer-list.component';
import {ComputerDetailsComponent} from './computer-details/computer-details.component';

const MAINTENANCE_ROUTES: Routes = [
  {
    path: '', component: MaintenanceComponent,
    children : [
      { path: 'laboratory',
        data: {title: 'LABORATORIES' },
        component: LaboratoryComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'laboratory/:id/computer-list',
        data: {title: 'COMPUTER LIST' },
        component: ComputerListComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'laboratory/:id/request-repair',
        data: {title: 'REQUEST REPAIR' },
        component: RequestRepairComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'laboratory/:id/computer-details',
        data: {title: 'COMPUTER DETAIL' },
        component: ComputerDetailsComponent,
        canActivate: [ AuthGuard ]
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(MAINTENANCE_ROUTES) ],
  exports: [ RouterModule ]
})
export class MaintenanceRoutingModule { }
