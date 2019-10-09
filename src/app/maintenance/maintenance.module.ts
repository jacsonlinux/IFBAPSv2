import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import {
  MzButtonModule,
  MzCollapsibleModule,
  MzCollectionModule,
  MzIconMdiModule,
  MzModalModule,
  MzSpinnerModule,
  MzToastModule
} from 'ngx-materialize';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ComputerDetailsComponent } from './computer-details/computer-details.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { RequestRepairComponent } from './request-repair/request-repair.component';
import { ComputerListComponent } from './computer-list/computer-list.component';

@NgModule({
  declarations: [MaintenanceComponent, ComputerDetailsComponent, LaboratoryComponent, RequestRepairComponent, ComputerListComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MzIconMdiModule,
    ZXingScannerModule,
    MzSpinnerModule,
    MzToastModule,
    MzCollectionModule,
    MzModalModule,
    MzButtonModule,
    MzCollapsibleModule
  ],
  providers: [MaintenanceService]
})
export class MaintenanceModule { }
