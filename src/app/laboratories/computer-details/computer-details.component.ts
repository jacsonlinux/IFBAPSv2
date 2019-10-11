import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LaboratoriesService } from '../laboratories.service';
import {AppService} from '../../app.service';
import {MzToastService} from 'ngx-materialize';
import {Router} from '@angular/router';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  computer;
  laboratory;

  constructor(
    private laboratoriesService: LaboratoriesService,
    private appService: AppService,
    private location: Location,
    private router: Router,
    private toastService: MzToastService
  ) { }

  ngOnInit() {
    this.laboratoriesService.currentLaboratory.subscribe(res => this.laboratory = res.id);
    this.appService.changePlaceTitle('COMPUTER DETAILS');
    this.laboratoriesService.currentComputer.subscribe(computer => {
      if (computer === null) { this.location.back(); } else {
        this.computer = computer;
      }
    });
  }

  repair(uuid) {
    this.laboratoriesService.repair(this.laboratory, uuid).then(res => {
      this.location.back();
      if (res.status === 1) {
        this.toastService.show(`${res.message}`, 5000, 'green white-text center');
      } else if (res.status === 2 ) {
        this.toastService.show(`${res.message}`, 5000, 'red darken-3 white-text center');
      }
    }).catch(err => err.message);
  }

}
