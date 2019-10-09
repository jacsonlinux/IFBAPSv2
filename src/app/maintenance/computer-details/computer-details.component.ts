import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  computer;

  constructor(
    private maintenanceService: MaintenanceService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.maintenanceService.currentComputer.subscribe(computer => {
      if (computer === null) { this.location.back(); } else {
        this.computer = computer;
      }
    });
  }

}
