import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { LaboratoriesService } from '../laboratories.service';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  computers;
  computer;
  laboratory;

  constructor(
    private laboratoriesService: LaboratoriesService,
    private appService: AppService,
  ) {
    console.log('ComputerListComponent');
    this.laboratoriesService.currentComputer.subscribe(res => this.computer = res);
    this.laboratoriesService.currentLaboratory.subscribe(res => this.laboratory = res);
    this.appService.changePlaceTitle('COMPUTERS LIST');
  }

  ngOnInit() {
    this.computers = this.laboratoriesService.getComputers(this.laboratory.id).map(res => res );
  }

  getComputer(computer) { this.laboratoriesService.changeComputer(computer); }
}
