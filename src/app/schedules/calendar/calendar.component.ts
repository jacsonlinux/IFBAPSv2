import { Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import 'rxjs/add/operator/filter';
import {DOCUMENT, Location} from '@angular/common';
import { isSameMonth, isSameDay } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CustomDateFormatter } from './utils/CustomDateFormatter';
import { colors} from './utils/colors';
import { SchedulesService } from '../schedules.service';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../../class/Schedule';
import {MzMediaService, MzToastService} from 'ngx-materialize';
import {AppService} from '../../app.service';
import {User} from '../../class/User';

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {

  public smallResolution: Observable<boolean>;
  public largeResolution: Observable<boolean>;

  placeID: string;
  schedules;
  user: User;
  filterActive: boolean;
  placeName: string;
  placeDescription: string;

  schedule = new Schedule();

  view = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  events$: Observable<Array<CalendarEvent<{ schedule: Schedule }>>>;

  activeDayIsOpen = false;

  clickedDate: Date;

  clickedColumn: number;

  refresh: Subject<any> = new Subject();

  private readonly darkThemeClass = 'dark-theme';

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: 0.5,
    startingTop: '30%',
    endingTop: '20%'
  };

  constructor(
    private appService: AppService,
    private mediaService: MzMediaService,
    private schedulesService: SchedulesService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private location: Location,
    private toastService: MzToastService,
    @Inject(DOCUMENT) private document
  ) {
    console.log('CalendarComponent');
    this.placeID = this.activatedRoute.snapshot.paramMap.get('id');

    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    this.largeResolution = this.mediaService.isActive('gt-s'); // small screen resolution
  }

  optionModalValue(value: boolean) {
    // console.log(value);
    /*if (value) {
      this.schedulesService.deleteSchedule('this.scheduleID')
        .then(res => { if (res) {
          // this.toastService.show('Scheduling deleted!', 3000, 'red white-text');
        }})
        .catch(err => err.message);
    }*/
  }

  dayClicked({date, events}: {
    date: Date;
    events: Array<CalendarEvent<{ schedule: Schedule }>>;
  }): void {
    console.log(date);
    this.schedulesService.changeDate(date);
    /*if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }*/
  }

  fetchEvents(): void {
    this.filterActive = false;
    this.events$ = this.schedulesService.getSchedules(this.placeID).map(res => {
      return res.map(schedule => {
        return {
          id: schedule.id,
          start: new Date(schedule.data.start.toDate()),
          end: new Date(schedule.data.end.toDate()),
          title: schedule.data.title,
          color: colors.yellow,
          resizable: {
            beforeStart: false,
            afterEnd: false
          },
          draggable: false,
          allDay: false,
          user: schedule.data.user,
          place: schedule.data.place,
          meta: {schedule}
        };
      });
    });
  }

  fetchUserEvents(): void {
    this.filterActive = true;
    this.events$ = this.schedulesService.getSchedulesUser(this.placeID, this.user.uid).map(res => {
      return res.map(schedule => {
        return {
          id: schedule.id,
          start: new Date(schedule.data.start.toDate()),
          end: new Date(schedule.data.end.toDate()),
          title: schedule.data.title,
          color: colors.blue,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true,
          allDay: false,
          user: schedule.data.user,
          place: schedule.data.place,
          meta: {schedule}
        };
      });
    });
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      console.log(newStart);
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log({event, action});
    /*this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });*/
  }

  eventClicked(schedule: CalendarEvent<{ schedule: Schedule }>): void {
    this.schedule.user = schedule.user;
    this.schedule.place = schedule.place;
    this.schedule.title = schedule.title;
    this.schedule.start = schedule.start;
    this.schedule.end = schedule.end;
    this.schedule.id = schedule.id;
  }

  cancelSchedule(scheduleID) {
    this.schedulesService.deleteSchedule(scheduleID)
      .then(res => { if (res) {
        this.toastService.show('Scheduling deleted!', 3000, 'orange white-text');
      }})
      .catch(err => err.message);

  }

  /*optionModalValue(value: boolean) {
    if (value) {
      this.schedulesService.deleteSchedule(this.scheduleID)
        .then(res => { if (res) {
          this.toastService.show('Scheduling deleted!', 3000, 'red white-text');
        }})
        .catch(err => err.message);
    }
  }*/


  ngOnInit() {
    this.authenticationService.user.subscribe(res => this.user = res );
    this.fetchEvents();
    this.schedulesService.getPlace(this.placeID).subscribe(res => {
      this.placeDescription = res.description;
      this.placeName = res.name;
      this.appService.changePlaceName(res.description);
    });
  }
}
