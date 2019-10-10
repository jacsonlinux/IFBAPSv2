import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { LaboratoriesService } from '../laboratories.service';
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
    private laboratoriesService: LaboratoriesService,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    console.log('ComputerListComponent');
  }

  ngOnInit() {

    this.computers = this.laboratoriesService.getComputers(this.activatedRoute.snapshot.params.id).map(res => res );

    this.laboratoriesService.currentComputer.subscribe(computer => this.computer = computer);

    // this.appService.changePlaceTitle('REPAIRS');

  }

  getComputer(computer) {
    console.log(computer)
    this.laboratoriesService.changeComputer(computer);
  }

  getTitle(lab) {}
}
