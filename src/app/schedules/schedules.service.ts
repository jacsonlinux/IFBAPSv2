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
  block: string;
  code: string;
  description: string;
  email: string;
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

  private selectedDate = new BehaviorSubject(null);
  currentDate = this.selectedDate.asObservable();

  /*
    private placeNameSource = new BehaviorSubject(null);
    currentPlaceName = this.placeNameSource.asObservable();*/

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

  changeDate(date) {
    this.selectedDate.next(date);
  }

  changeSubtitle(subtitle) {
    this.subtitleSource.next(subtitle);
  }

  /*changePlaceName(placeName) {
    this.placeNameSource.next(placeName);
  }*/

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

  addPlaces() {
    const places = [
     {code: 'A02', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A03', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A04', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A05', description: 'Lab. Informática I ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A06', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A08', description: 'Lab. Informática II ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A09', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A10', description: 'Lab. Electronics and Electricity ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A11', description: 'Lab. Technical Drawing ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A12', description: 'Science and Tec Specialization. Environmental - Lab. Chemistry ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A14', description: 'Postgrad. Science and Tec. Environmental LITE - Lab. Interd de Tec. Educational. ', Status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A17', description: 'Auditorium', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A18', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A19', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A20', description: 'Lab. Sensory Analysis', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A21', description: 'Lab. Instrumental PPGCTA and CTEAM ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A22', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'A24', description: 'Lab. Chemistry ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'A'},
      {code: 'A26', description: 'Refectory', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'A'},
      {code: 'C01', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C02', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C03', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C04', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C05', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C07', description: 'Lab. Informática I ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C08', description: 'Lab. Informática II ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C09', description: 'Lab. Networking ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C10', description: 'Lab. Assembly and Maintenance Guide ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C11', description: 'Lab. Food Processing ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C12', description: 'Lab. Biology and Microbiology ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C14', description: 'Lab. Distillation and Extraction of Essential Oils', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C17', description: 'Lab. Química Geral / Órganica ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C18', description: 'Lab. General Chemistry / Inorganic / Physical Chemistry ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C19', description: 'Lab. Biofuels / Unit Op. / Transport Phenomena ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C20', description: 'Lab. Physics / Mathematics', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C21', description: 'Lab. Humanities', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C22', description: 'Lab. Indigenous Intercultural ', status: true, email: 'jacsoncorrea@ifba.edu.br ', block: 'C'},
      {code: 'C27', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'},
      {code: 'C28', description: 'Classroom', status: true, email: 'jacsoncorrea@ifba.edu.br', block: 'C'}
    ];
    for (const entry of places) {
      this.angularFirestore
        .collection('places')
        .add(entry)
        .then(() => true)
        .catch(err => err.message);
    }
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
    return this.angularFirestore.collection('laboratories/' + laboratoryId + '/computers')
      .add(computer)
      .then(() => true )
      .catch(err => err.message);
  }

}
