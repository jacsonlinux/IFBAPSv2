import { Component, OnInit } from '@angular/core';
import {MaintenanceService} from '../maintenance.service';
import {AppService} from '../../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MzToastService} from 'ngx-materialize';

@Component({
  selector: 'app-request-repair',
  templateUrl: './request-repair.component.html',
  styleUrls: ['./request-repair.component.scss']
})
export class RequestRepairComponent implements OnInit {

  showSpinner: boolean;

  laboratoryID;

  constructor(
    private maintenanceService: MaintenanceService,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: MzToastService

  ) { console.log('RepairComponent'); }

  ngOnInit() {
    this.laboratoryID = this.activatedRoute.snapshot.params.id;
    this.showSpinner = false; /*this.test();*/ }

  /*test() {
      this.showSpinner = !this.showSpinner;
      const laboratoryID = this.activatedRoute.snapshot.params.id;
      this.maintenanceService
        .repairComputer(`${laboratoryID}`, '4C4C4544-0044-3610-8033-C6C04F305931')
        .then(res => {
          if (res) {
            this.showSpinner = !this.showSpinner;
            this.router.navigate(['home']).catch(err => err.message);
            this.toastService.show('Open call successfully.', 5000, 'green white-text center');
          } else {
            this.showSpinner = !this.showSpinner;
            this.toastService.show('the document does not exist or is already in maintenance.', 5000, 'red darken-3 white-text center');
          }
        })
        .catch(err => err.message);
  }*/

  scanSuccess(uuid) {
    this.showSpinner = !this.showSpinner;

    this.maintenanceService
      .repairComputer(`${this.laboratoryID}`, `${uuid}`)
      .then(res => {
        if (res) {
          this.showSpinner = !this.showSpinner;
          this.router.navigate(['home']).catch(err => err.message);
          this.toastService.show('Open call successfully.', 5000, 'green white-text center');
        } else {
          this.showSpinner = !this.showSpinner;
          this.toastService.show('the document does not exist or is already in maintenance.', 5000, 'red darken-3 white-text center');
        }
      })
      .catch(err => err.message);
  }

}
