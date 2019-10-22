import { Component, OnInit } from '@angular/core';
import {LaboratoriesService} from '../laboratories.service';
import {AppService} from '../../app.service';
import {MzToastService} from 'ngx-materialize';

@Component({
  selector: 'app-computer-scan',
  templateUrl: './computer-scan.component.html',
  styleUrls: ['./computer-scan.component.scss']
})
export class ComputerScanComponent implements OnInit {

  uuid;

  constructor(
    private laboratoriesService: LaboratoriesService,
    private appService: AppService,
    private toastService: MzToastService
  ) {
    this.appService.changePlaceTitle('COMPUTER SCAN');
    this.laboratoriesService.currentComputer.subscribe(res => this.uuid = res.id);
  }

  scanSuccess(uuid) {
    if (uuid === this.uuid) {
      this.toastService.show(`It is this computer`, 2000, 'green white-text center');
    } else {
      this.toastService.show(`It's not this computer`, 1000, 'red white-text center');
    }
  }

  ngOnInit() { }

}
