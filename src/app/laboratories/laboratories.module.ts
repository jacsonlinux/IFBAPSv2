import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MzButtonModule, MzCardModule, MzCheckboxModule,
  MzCollapsibleModule,
  MzCollectionModule,
  MzIconMdiModule, MzInputModule,
  MzModalModule,
  MzSpinnerModule, MzTextareaModule,
  MzToastModule, MzValidationModule
} from 'ngx-materialize';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {ComputerDetailsComponent} from './computer-details/computer-details.component';
import {ComputerListComponent} from './computer-list/computer-list.component';
import {RequestRepairComponent} from './request-repair/request-repair.component';
import {LaboratoriesRoutingModule} from './laboratories-routing.module';
import {LaboratoriesService} from './laboratories.service';
import {LaboratoriesComponent} from './laboratories.component';
import {LaboratoryListComponent} from './laboratory-list/laboratory-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RepairListComponent } from './repair-list/repair-list.component';
import { ComputerScanComponent } from './computer-scan/computer-scan.component';

@NgModule({

  declarations: [LaboratoriesComponent, ComputerDetailsComponent, RequestRepairComponent, ComputerListComponent, LaboratoryListComponent, RepairListComponent, ComputerScanComponent],
  imports: [
    CommonModule,
    LaboratoriesRoutingModule,
    MzIconMdiModule,
    ZXingScannerModule,
    MzSpinnerModule,
    MzToastModule,
    MzCollectionModule,
    MzModalModule,
    MzButtonModule,
    MzCollapsibleModule,
    MzTextareaModule,
    MzInputModule,
    MzCardModule,
    ReactiveFormsModule,
    MzValidationModule,
    MzCheckboxModule
  ],
  providers: [LaboratoriesService]

})
export class LaboratoriesModule { }
