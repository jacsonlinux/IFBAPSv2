import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { RepairComponent } from './repair/repair.component';
import { MaintenanceService } from "./maintenance.service";
import { MaintenanceRoutingModule } from "./maintenance-routing.module";
import {MzCollectionModule, MzIconMdiModule, MzSpinnerModule, MzToastModule} from "ngx-materialize";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { PlaceComponent } from './place/place.component';

@NgModule({
  declarations: [MaintenanceComponent, RepairComponent, PlaceComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MzIconMdiModule,
    ZXingScannerModule,
    MzSpinnerModule,
    MzToastModule,
    MzCollectionModule
  ],
  providers: [MaintenanceService]
})
export class MaintenanceModule { }
