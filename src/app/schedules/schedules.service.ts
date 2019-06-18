import { Injectable} from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { MzToastService } from 'ngx-materialize';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Laboratory { name: string; maintenance: boolean; computers: any; applications: any; }
export interface LaboratoryId extends Laboratory { id: string; }

export interface Schedule {
  startTime: any;
  endTime: any;
  place: string;
  user: string;
}
export interface ScheduleId extends Schedule { id: string; }

export interface Place {
  name: string;
  email: string;
  sector: string;
}
export interface PlaceId extends Place { id: string; }

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

  private titleSource = new BehaviorSubject(null);
  currentTitle = this.titleSource.asObservable();

  laboratoryCollection: AngularFirestoreCollection<any>;
  laboratories: Observable<any>;

  scheduleCollection: AngularFirestoreCollection<any>;
  schedules: Observable<any>;

  placeCollection: AngularFirestoreCollection<any>;
  places: Observable<any>;

  computerCollection: AngularFirestoreCollection<any>;
  computers: Observable<any>;

  applicationCollection: AngularFirestoreCollection<any>;
  applications: Observable<any>;

  computerDoc: AngularFirestoreDocument<any>;
  computer: Observable<any>;

  laboratoryDoc: AngularFirestoreDocument<any>;
  laboratory: Observable<any>;

  scheduleDoc: AngularFirestoreDocument<any>;
  schedule: Observable<any>;

  constructor(
    private angularFirestore: AngularFirestore,
  ) {
    console.log('LaboratoriesService');
  }

  changeTitle(title) {
    this.titleSource.next(title);
  }

  getSchedules(place: string, user: string) {
    this.scheduleCollection = this.angularFirestore
      .collection<Schedule>('schedules', ref => ref
        .where('place', '==', place)
        .where( 'user', '==', user)
        .orderBy('startTime', 'asc')
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

  newSchedule(data) {
    data = JSON.parse(data);
    return this.angularFirestore
      .collection('schedules')
      .add(data)
      .then(() => true )
      .catch(err => err.message);
  }

  /*newSchedule(data) {
    // data = JSON.parse(data);

    console.log(data);
    return this.angularFirestore
      .collection('schedules')
      .add(data)
      .then(() => true )
      .catch(err => err.message);
  }*/

  deleteSchedule(scheduleID: string) {
    return  this.angularFirestore
      .collection('schedules')
      .doc(scheduleID)
      .delete()
      .then(() => true )
      .catch(err => err.message);
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
