import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../schedules.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  subtitle;

  constructor( private schedulesService: SchedulesService
  ) { console.log('SchedulesComponent'); }

  ngOnInit() {
    this.schedulesService.currentSubtitle.subscribe(subtitle => this.subtitle = subtitle);
  }

}
