import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Laboratory { name: string; maintenance: boolean; computers: any; applications: any; }
export interface LaboratoryId extends Laboratory { id: string; }

export interface Schedule {
  title: any;
  start: any;
  end: any;
  place: any;
  user: any;
}
export interface ScheduleId extends Schedule { id: string; }

export interface Place {
  name: string;
  email: string;
  sector: string;
  status: boolean;
}
export interface PlaceId extends Place { id: string; }

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  profile: string;
}
export interface UserId extends User { id: string; }

export interface Computer {
  active: boolean;
  data: object;
}
export interface ComputerId extends Computer { id: string; }

export interface Application {
  name: string;
  version: string;
}
export interface ApplicationId extends Application { id: string; }

@Injectable()
export class SchedulesService {

  private computerSource = new BehaviorSubject(null);
  currentComputer = this.computerSource.asObservable();

  private subtitleSource = new BehaviorSubject(null);
  currentSubtitle = this.subtitleSource.asObservable();

  laboratoryCollection: AngularFirestoreCollection<any>;
  laboratories: Observable<any>;

  scheduleCollection: AngularFirestoreCollection<any>;
  schedules: Observable<any>;

  placeCollection: AngularFirestoreCollection<any>;
  places: Observable<any>;

  userCollection: AngularFirestoreCollection<any>;
  users: Observable<any>;

  computerCollection: AngularFirestoreCollection<any>;
  computers: Observable<any>;

  applicationCollection: AngularFirestoreCollection<any>;
  applications: Observable<any>;

  placeDoc: AngularFirestoreDocument<any>;
  place: Observable<any>;

  userDoc: AngularFirestoreDocument<any>;
  user: Observable<any>;

  computerDoc: AngularFirestoreDocument<any>;
  computer: Observable<any>;

  laboratoryDoc: AngularFirestoreDocument<any>;
  laboratory: Observable<any>;

  scheduleDoc: AngularFirestoreDocument<any>;
  schedule: Observable<any>;

  constructor( private angularFirestore: AngularFirestore ) { console.log('SchedulesService'); }

  /*validatePeriod = (testPeriod, periods): boolean => {
    for (let i = 0; periods.length; i++) {
      const period = periods[i];
      if (period.start < testPeriod.start && period.end > testPeriod.start) {
        return false;
      }
      if (period.start > testPeriod.start && period.start < testPeriod.end) {
        return false;
      }
    }
    return true;
  }*/

  changeSubtitle(subtitle) {
    this.subtitleSource.next(subtitle);
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
        .orderBy('name'));

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

  newSchedule(schedule) {
    return this.angularFirestore
      .collection('schedules')
      .add(schedule)
      .then(() => true )
      .catch(err => err.message);
  }

  deleteSchedule(scheduleID: string) {
    return  this.angularFirestore
      .collection('schedules')
      .doc(scheduleID)
      .delete()
      .then(() => true )
      .catch(err => err.message);
  }

  validateSchedule(schedule: Schedule) {

    console.log(schedule);

    /*const schedule = {
      start: new Date(2019, 6, 25, 2, 0, 0),
      end: new Date(2019, 6, 25, 4  , 0, 0),
      user: 'gZzVb7Cs9HcXoX8NvtUoalOZB2R2',
      place: 'j5XeONPpvQIBEzd6JXGU',
      title: 'Programming logic class'
    };*/

    const start = new Date(schedule.start.getFullYear(), schedule.start.getMonth(), schedule.start.getDate());

    const end = new Date(schedule.start.getFullYear(), schedule.start.getMonth(), schedule.start.getDate(), 23, 59, 59);

    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('start', '>=', start)
        .where('start', '<=', end)
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

    /*this.schedules.subscribe(schedules => {
      if (schedules.length === 0) {
        console.log('pode agendar esse periodo!');
      } else {
        const periods = [];
        for (const entry of schedules) {
          periods.push({
            start: entry.data.start.toDate(),
            end: entry.data.end.toDate()
          });
        }
        const testPeriod = {
          start: schedule.start,
          end: schedule.end
        };
        const x = this.validatePeriod(testPeriod, periods);
        console.log(x);
      }
    });*/

  }

  getPlace(placeID: string) {
    this.placeDoc = this.angularFirestore.doc('places/' + placeID);
    this.place = this.placeDoc.valueChanges();
    return this.place;
  }

  getUser(userID: string) {
    this.userDoc = this.angularFirestore.doc('users/' + userID);
    this.user = this.userDoc.valueChanges();
    return this.user;
  }

  getSchedulesDay(schedule) {

    const beginDay = new Date(schedule.start.getFullYear(), schedule.start.getMonth(), schedule.start.getDate());
    const endDay = new Date(schedule.start.getFullYear(), schedule.start.getMonth(), schedule.start.getDate(), 23, 59, 59);

    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('start', '>=', beginDay)
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

  getLaboratories() {
    this.laboratoryCollection = this.angularFirestore.collection<Laboratory>('laboratories', ref => ref.orderBy('name'));
    this.laboratories = this.laboratoryCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Laboratory;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    return this.laboratories;
  }

  changeComputer(computer) {
    this.computerSource.next(computer);
  }

  getLaboratoriesComputers() {
    this.laboratoryCollection = this.angularFirestore.collection<Laboratory>('laboratories', ref => ref.orderBy('name'));
    this.laboratories = this.laboratoryCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.computerCollection = this.angularFirestore
          .collection<Laboratory>('laboratories')
          .doc(id)
          .collection<Computer>('computers');
        const computers = this.computerCollection.valueChanges();
        return { id, data, computers};
      });
    });
    return this.laboratories;
  }

  getLaboratory(laboratoryID: string) {
    this.laboratoryDoc = this.angularFirestore.doc('laboratories/' + laboratoryID);
    this.laboratory = this.laboratoryDoc.valueChanges();
    return this.laboratory;
  }

  getComputers(laboratoryID: string) {
    this.computerCollection = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratoryID)
      .collection<Computer>('computers');
    this.computers = this.computerCollection
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Computer;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
    return this.computers;
  }

  getComputer(laboratoryID: string, computerID: string) {
    this.computerDoc = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratoryID)
      .collection<Computer>('computers')
      .doc(computerID);
    return this.computerDoc.ref
      .get()
      .then(documentSnapshot => {
        return documentSnapshot;
        /*if (documentSnapshot.exists) {
          return documentSnapshot.data();
        } else {
          return 'This document does not exist in the database.';
        }*/
      })
      .catch(err => err.message);
  }

  getApplications(laboratoryID: string) {
    this.applicationCollection = this.angularFirestore.collection('laboratories/' + laboratoryID + '/applications');
    this.applications = this.applicationCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Application;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
    return this.applications;
  }

  repairUpdate(laboratoryID: string, computerID: string) {
    this.computerDoc = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratoryID)
      .collection<Computer>('computers')
      .doc(computerID);
    return this.computerDoc.update({maintenance: true}).then(() => true).catch(err => err.message);
  }

  newComputer(computer, laboratoryId) {
    return this.angularFirestore.collection('laboratories/' + laboratoryId + '/computers').add(computer)
      .then(() => true )
      .catch(err => err.message);
  }

}
