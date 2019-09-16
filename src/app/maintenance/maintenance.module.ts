import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { RepairComponent } from './repair/repair.component';
import { MaintenanceService } from "./maintenance.service";
import { MaintenanceRoutingModule } from "./maintenance-routing.module";

@NgModule({
  declarations: [MaintenanceComponent, RepairComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule
  ],
  providers: [MaintenanceService]
})
export class MaintenanceModule { }
