import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { MaintenanceService } from '../maintenance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  computers;
  computer;

  constructor(
    private maintenanceService: MaintenanceService,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    console.log('ComputerListComponent');
  }

  ngOnInit() {

    this.computers = this.maintenanceService.getComputers(this.activatedRoute.snapshot.params.id).map(res => res );

    this.maintenanceService.currentComputer.subscribe(computer => this.computer = computer);

    // this.appService.changePlaceTitle('REPAIRS');

  }

  getComputer(computer) {
    console.log(computer)
    this.maintenanceService.changeComputer(computer);
  }

  getTitle(lab) {}
}
