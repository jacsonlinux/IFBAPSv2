import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guard/auth.guard';
import {NgModule} from '@angular/core';
import {LaboratoriesComponent} from './laboratories.component';
import {ComputerListComponent} from './computer-list/computer-list.component';
import {RequestRepairComponent} from './request-repair/request-repair.component';
import {ComputerDetailsComponent} from './computer-details/computer-details.component';
import {LaboratoryListComponent} from './laboratory-list/laboratory-list.component';
import {RepairListComponent} from './repair-list/repair-list.component';

const LABORATORIES_ROUTES: Routes = [
  {
    path: '', component: LaboratoriesComponent,
    children : [
      { path: 'laboratory-list',
        data: {title: 'LABORATORIES' },
        component: LaboratoryListComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'repair-list',
        data: {title: 'REPAIR LIST' },
        component: RepairListComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'computer-list',
        data: {title: 'COMPUTER LIST' },
        component: ComputerListComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'laboratory-list/:id/request-repair',
        data: {title: 'REQUEST REPAIR' },
        component: RequestRepairComponent,
        canActivate: [ AuthGuard ]
      },
      { path: 'computer-details',
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

/*{ path: 'laboratory-list/:id/computer-details',
  data: {title: 'COMPUTER DETAIL' },
  component: ComputerDetailsComponent,
  canActivate: [ AuthGuard ]
}*/
