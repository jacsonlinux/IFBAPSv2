import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit {

  constructor(
    private appService: AppService, private router: Router
  ) { console.log('RepairComponet') }

  ngOnInit() {
    this.appService.changePlaceTitle('Repair');
  }

}
