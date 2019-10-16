import { Component, OnInit } from '@angular/core';
import {LaboratoriesService} from '../laboratories.service';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-repair-list',
  templateUrl: './repair-list.component.html',
  styleUrls: ['./repair-list.component.scss']
})
export class RepairListComponent implements OnInit {

  computers;

  constructor(
    private laboratoriesService: LaboratoriesService,
    private appService: AppService,
  ) { }

  getComputer(computer) {
    this.laboratoriesService.changeComputer(computer);
  }

  ngOnInit() {
    this.appService.changePlaceTitle('REPAIR LIST');
    this.laboratoriesService.getComputerInMaintenance().subscribe(res => this.computers = res);
  }

}
