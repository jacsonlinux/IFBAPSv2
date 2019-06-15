import {Component, ComponentRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedulesService } from '../schedules.service';
import { Schedule } from '../../class/Schedule';
import { AuthenticationService } from '../../authentication/authentication.service';
import { MzModalService } from 'ngx-materialize';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  schedules;
  schedule: Schedule = new Schedule();

  public modalComponentRef: ComponentRef<ModalComponent>;

  constructor(
    private modalService: MzModalService,
    private schedulesService: SchedulesService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { console.log('ListComponent'); }

  public agreed: boolean;
  public inputValue: string;

  setModalAgreementValue(value: boolean) {
    this.agreed = value;
  }

 /* openServiceModal(id) {

    this.modalService.open(ModalComponent, { scheduleID: id });

  }*/

  ngOnInit() {
    this.schedulesService.changeTitle('');
    this.schedule.place = this.activatedRoute.snapshot.paramMap.get('id');
    this.authenticationService.user.subscribe(user => {
      this.schedule.user = user.uid;
      this.schedules = this.schedulesService
        .getSchedules(this.schedule.place, this.schedule.user).map(res => res);
    });
  }

  getTitle(title) { this.schedulesService.changeTitle(title); }

  openServiceModal(id) {
    // need to cast for now as the return type of MzModalService.open is MzBaseModal (this will be fix in a near futur)
    this.modalComponentRef = this.modalService.open(ModalComponent, { scheduleID: id  }) as ComponentRef<ModalComponent>;

    console.log(id);
  }


}
