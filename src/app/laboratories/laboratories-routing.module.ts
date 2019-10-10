import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guard/auth.guard';
import {NgModule} from '@angular/core';
import {LaboratoriesComponent} from './laboratories.component';
import {ComputerListComponent} from './computer-list/computer-list.component';
import {RequestRepairComponent} from './request-repair/request-repair.component';
import {ComputerDetailsComponent} from './computer-details/computer-details.component';
import {LaboratoryListComponent} from './laboratory-list/laboratory-list.component';

const LABORATORIES_ROUTES: Routes = [
  {
    path: '', component: LaboratoriesComponent,
    children : [
      { path: 'laboratory-list',
        data: {title: 'LABORATORIES' },
        component: LaboratoryListComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'laboratory-list/:id/computer-list',
        data: {title: 'COMPUTER LIST' },
        component: ComputerListComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'laboratory-list/:id/request-repair',
        data: {title: 'REQUEST REPAIR' },
        component: RequestRepairComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'laboratory-list/:id/computer-details',
        data: {title: 'COMPUTER DETAIL' },
        component: ComputerDetailsComponent,
        canActivate: [ AuthGuard ]
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(LABORATORIES_ROUTES) ],
  exports: [ RouterModule ]
})
export class LaboratoriesRoutingModule { }
