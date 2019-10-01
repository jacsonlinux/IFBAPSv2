import {Component, OnInit} from '@angular/core';
import {MaintenanceService} from "../maintenance.service";
import {AppService} from "../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MzToastService} from "ngx-materialize";

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit {

  showSpinner: boolean;

  constructor(
    private maintenanceService: MaintenanceService,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: MzToastService

  ) { console.log('RepairComponent'); }

  ngOnInit() {

    this.showSpinner = false;

    /*this.maintenanceService
      .getComputer('n8xca2iUgarDgt9nB9Pj', '4C4C4544-0044-3610-8033-C6C04F305931')
      .subscribe(res => {
        console.log(res);
      });*/

    this.maintenanceService
      .repairComputer(
        'n8xca2iUgarDgt9nB9Pj',
        '4C4C4544-0044-3610-8033-C6C04F305931');
  }

  scanSuccess(uuid) {
    // 4C4C4544-0044-3610-8033-C6C04F305931
    // n8xca2iUgarDgt9nB9Pj
    /*const laboratoryID = this.activatedRoute.snapshot.params['id'];
    this.maintenanceService
      .getComputer(`${laboratoryID}`, `${uuid}`)
      .subscribe(res => {
        const data = res[0].data;
        this.showSpinner = !this.showSpinner;
        if (res.data()) {
          if (res.data().maintenance === true) {
            this.showSpinner = !this.showSpinner;
            this.toastService.show('An open call to this computer already exists.', 4000, 'orange darken-3 white-text center');
          } else {
            this.maintenanceService.repairUpdate(laboratoryID, uuid)
              .then(() => {
              this.router.navigate(['laboratories/' + laboratoryID]).catch(err => err.message);
              this.toastService.show('Open call successfully.', 4000, 'green white-text center');
            } )
              .catch(err => err.message);
          }
        } else {
          this.showSpinner = !this.showSpinner;
          this.toastService.show('This document does not exist in the database.', 4000, 'red darken-3 withe-text center');
        }
      });*/

    /*this.maintenanceService.getComputer(laboratoryID, uuid).then(res => {
      this.showSpinner = !this.showSpinner;
      if (res.data()) {
        if (res.data().maintenance === true) {
          this.showSpinner = !this.showSpinner;
          this.toastService.show('An open call to this computer already exists.', 4000, 'orange darken-3 white-text center');
        } else {
          this.maintenanceService.repairUpdate(laboratoryID, uuid).then(() => {
            this.router.navigate(['laboratories/' + laboratoryID]).catch(err => err.message);
            this.toastService.show('Open call successfully.', 4000, 'green white-text center');
          } ).catch(err => err.message);
        }
      } else {
        this.showSpinner = !this.showSpinner;
        this.toastService.show('This document does not exist in the database.', 4000, 'red darken-3 withe-text center');
      }
    }).catch(err => err.message);*/
  }

}
