import { Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';

import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {
  isSameMonth, isSameDay, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, startOfDay, endOfDay,
  format, subDays, addHours, addDays
} from 'date-fns';

import {Observable, Subject} from 'rxjs';

import {AuthenticationService} from '../../authentication/authentication.service';
import {CustomDateFormatter} from '../../class/CustomDateFormatter';
import {colors} from './utils/colors';
import {SchedulesService} from '../schedules.service';
import {ActivatedRoute} from '@angular/router';
import {Schedule} from '../../class/Schedule';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

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

  placeID;
  schedules;
  user;
  subtitle;

  view = 'month';

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    /*{
      label: '<i class="material-icons">edit</i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },*/
    /*{
      label: '<i class="red-text material-icons">delete</i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }*/
  ];

  // events: CalendarEvent[] = [];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  events$: Observable<Array<CalendarEvent<{ schedule: Schedule }>>>;

  activeDayIsOpen = false;

  clickedDate: Date;

  clickedColumn: number;

  refresh: Subject<any> = new Subject();

  private readonly darkThemeClass = 'dark-theme';

  constructor(
    private schedulesService: SchedulesService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    @Inject(DOCUMENT) private document,
  ) {
    console.log('CalendarComponent');
    this.placeID = this.activatedRoute.snapshot.paramMap.get('id');
    this.authenticationService.user.subscribe(res => this.user = res.uid);
  }

  /*fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    const params = new HttpParams()
      .set(
        'primary_release_date.gte',
        format(getStart(this.viewDate), 'YYYY-MM-DD')
      )
      .set(
        'primary_release_date.lte',
        format(getEnd(this.viewDate), 'YYYY-MM-DD')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.http
      .get('https://api.themoviedb.org/3/discover/movie', { params })
      .pipe(
        map(({ results }: { results: Film[] }) => {
          return results.map((film: Film) => {
            return {
              title: film.title,
              start: new Date(film.release_date + getTimezoneOffsetString(this.viewDate) ),
              color: colors.yellow,
              allDay: true,
              meta: { film }
            };
          });
        })
      );
  }*/

  dayClicked({ date, events }: {
    date: Date;
    events: Array<CalendarEvent<{ schedule: Schedule }>>;
  }): void {
    console.log(date);
    console.log(events);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ schedule: Schedule }>): void {
    console.log(event);
    /*window.open(
      `https://www.themoviedb.org/movie/${event.meta.film.id}`,
      '_blank'
    );*/
  }

  fetchEvents() {
    this.events$ = this.schedulesService.getSchedules(this.placeID).map(res => {
      return res.map(schedule => {
        return {
          start: new Date(schedule.data.start.toDate()),
          end: new Date(schedule.data.end.toDate()),
          title: schedule.data.title,
          color: colors.yellow,
          // actions: this.actions,
          resizable: {
            beforeStart: false,
            afterEnd: false
          },
          draggable: false,
          allDay: false,
          meta: {schedule}
        };
      });
    } );
  }

  eventTimesChanged( { event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
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
    console.log({event, action });
    /*this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });*/
  }

  filter() {
    console.log(this.user);

    this.events$ = this.schedulesService.getSchedulesUser(this.placeID, this.user).map(res => {
      return res.map(schedule => {
        return {
          start: new Date(schedule.data.start.toDate()),
          end: new Date(schedule.data.end.toDate()),
          title: schedule.data.title,
          color: colors.blue,
          // actions: this.actions,
          resizable: {
            beforeStart: false,
            afterEnd: false
          },
          draggable: false,
          allDay: false,
          meta: {schedule}
        };
      });
    } );
  }

  show(show) {
    console.log(show);
  }

  ngOnInit() {
    this.document.body.classList.add(this.darkThemeClass);
    this.fetchEvents();
    this.schedulesService.currentSubtitle.subscribe(subtitle => this.subtitle = subtitle);
  }

}
