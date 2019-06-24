import { Component, OnInit /*, ChangeDetectionStrategy, Inject*/} from '@angular/core';
/*import {CalendarDateFormatter, CalendarEvent} from 'angular-calendar';*/
import { AuthenticationService } from '../authentication/authentication.service';
import 'rxjs/add/operator/filter';
/*import { DOCUMENT } from '@angular/common';
import {CustomDateFormatter} from '../class/CustomDateFormatter';*/


import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from '../demo-utils/colors';

/*interface Film {
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
}*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  /*changeDetection: ChangeDetectionStrategy.OnPush,*/
  styleUrls: ['./home.component.scss'],
  /*providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]*/
})
export class HomeComponent implements OnInit {

  /*view = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  events$: Observable<Array<CalendarEvent<{ film: Film }>>>;

  activeDayIsOpen = false;

  clickedDate: Date;

  clickedColumn: number;

  private readonly darkThemeClass = 'dark-theme';*/

  constructor(/*private http: HttpClient,
              @Inject(DOCUMENT) private document,*/
              private authenticationService: AuthenticationService ) { console.log('HomeComponent'); }

  ngOnInit() {
    /*this.fetchEvents();
    this.document.body.classList.add(this.darkThemeClass);*/
    this.authenticationService.user
      .filter(user => !!user) // filter null
      .take(1) // take first real user
      .subscribe(user => {
        if (user) { }
      });
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
              start: new Date(
                film.release_date + getTimezoneOffsetString(this.viewDate)
              ),
              color: colors.yellow,
              allDay: true,
              meta: {
                film
              }
            };
          });
        })
      );
  }

  dayClicked({
               date,
               events
             }: {
    date: Date;
    events: Array<CalendarEvent<{ film: Film }>>;
  }): void {
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

  eventClicked(event: CalendarEvent<{ film: Film }>): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.meta.film.id}`,
      '_blank'
    );
  }*/

}
