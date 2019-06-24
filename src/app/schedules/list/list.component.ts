import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedulesService } from '../schedules.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  placeID;
  schedules;
  user;
  show: boolean;
  showSpinner: boolean;

  now = new Date();

  constructor(
    private schedulesService: SchedulesService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { console.log('ListComponent'); this.show = false; console.log(this.now); }

  details(id: string) { console.log(id); }

  ngOnInit() {
    this.showSpinner = true;
    this.placeID = this.activatedRoute.snapshot.paramMap.get('id');
    this.authenticationService.user.subscribe(res => this.user = res.uid);
    this.schedules = this.schedulesService.getSchedules(this.placeID).map(res => res );
    this.schedules.subscribe(res => {
      this.show = !!res.length;
      this.showSpinner = false;
    });
  }

}
