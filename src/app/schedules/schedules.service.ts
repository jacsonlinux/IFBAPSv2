import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Schedule {
  title: any;
  start: any;
  end: any;
  place: any;
  user: any;
}

export interface Place {
  block: string;
  code: string;
  description: string;
  email: string;
  status: boolean;
}

@Injectable()
export class SchedulesService {

  private selectedDate = new BehaviorSubject(null);
  currentDate = this.selectedDate.asObservable();

  scheduleCollection: AngularFirestoreCollection<any>;
  schedules: Observable<any>;

  placeCollection: AngularFirestoreCollection<any>;
  places: Observable<any>;

  placeDoc: AngularFirestoreDocument<any>;
  place: Observable<any>;

  constructor( private angularFirestore: AngularFirestore ) { console.log('SchedulesService'); }

  changeDate(date) {
    this.selectedDate.next(date);
  }

  getSchedules(placeID: string) {
    const now = new Date();
    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('place', '==', placeID)
        .where('start', '>', now)
        .orderBy('start', 'asc')
      );
    this.schedules = this.scheduleCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Schedule;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.schedules;
  }

  getSchedulesUser(place: string, user: string ) {
    const now = new Date();
    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('place', '==', place)
        .where( 'user', '==', user)
        .where('start', '>', now)
        .orderBy('start', 'asc')
      );
    this.schedules = this.scheduleCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Schedule;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.schedules;
  }

  getPlaces() {
    this.placeCollection = this.angularFirestore
      .collection<Place>('places', ref => ref
        .orderBy('code'));

    this.places = this.placeCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Place;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.places;
  }

  deleteSchedule(scheduleID: string) {
    return  this.angularFirestore
      .collection('schedules')
      .doc(scheduleID)
      .delete()
      .then(() => true )
      .catch(err => err.message);
  }

  newSchedule(schedule) {
    return this.angularFirestore
      .collection('schedules')
      .add(schedule)
      .then(() => true )
      .catch(err => err.message);
  }

  validateSchedule(schedule: Schedule) {

    const startDay = new Date(
      schedule.start.getFullYear(),
      schedule.start.getMonth(),
      schedule.start.getDate(),
      0, 0, 0);

    const endDay = new Date(
      schedule.start.getFullYear(),
      schedule.start.getMonth(),
      schedule.start.getDate(),
      23, 59, 59);


    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('place', '==', schedule.place)
        .where('start', '>=', startDay)
        .where('start', '<=', endDay)
        .orderBy('start', 'asc')
      );
    this.schedules = this.scheduleCollection.snapshotChanges().map(actions => {
      return actions.map(res => {
        const data = res.payload.doc.data() as Schedule;
        const id = res.payload.doc.id;
        return { id, data };
      });
    });
    return this.schedules;
  }

  getPlace(placeID: string) {
    this.placeDoc = this.angularFirestore.doc('places/' + placeID);
    this.place = this.placeDoc.valueChanges();
    return this.place;
  }
}
