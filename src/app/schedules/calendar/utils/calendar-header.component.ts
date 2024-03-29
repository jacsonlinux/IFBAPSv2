import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MzMediaService } from 'ngx-materialize';
import { Observable } from 'rxjs';
import {User} from '../../../class/User';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mwl-utils-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {

  show: boolean;

  public smallResolution: Observable<boolean>;
  public largeResolution: Observable<boolean>;

  constructor(   private mediaService: MzMediaService) {
    console.log('CalendarComponent');
    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    this.largeResolution = this.mediaService.isActive('gt-s'); // small screen resolution
    this.show = false;
    this.filterActive = false;
  }

  @Input() view;

  @Input() filterActive: boolean;

  @Input() viewDate: Date;

  @Input() user: User;

  @Input() locale = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  @Output() filter: EventEmitter<Date> = new EventEmitter();

}
