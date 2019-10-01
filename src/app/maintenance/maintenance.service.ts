import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Schedule} from "../schedules/schedules.service";

export interface Laboratory {
  block: string;
  code: string;
  description: string;
  email: string;
  status: boolean;
  computers: any
}
export interface LaboratoryId extends Laboratory { id: string; }
export interface Computer { data: object; }
export interface ComputerId extends Computer { id: string; }
export interface Place {
  block: string;
  code: string;
  description: string;
  email: string;
  status: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  placeCollection: AngularFirestoreCollection<any>;
  places: Observable<any>;

  placeDoc: AngularFirestoreDocument<any>;
  place: Observable<any>;

  laboratoryCollection: AngularFirestoreCollection<any>;
  laboratories: Observable<any>;

  computerCollection: AngularFirestoreCollection<any>;
  computers: Observable<any>;

  computerDoc: AngularFirestoreDocument<any>;
  computer: Observable<any>;

  laboratoryDoc: AngularFirestoreDocument<any>;
  laboratory: Observable<any>;

  constructor(
    private angularFirestore: AngularFirestore
  ) { console.log('MaintenanceService'); }



  repairComputer(laboratoryID: string, uuid: string) {

    this.computerCollection = this.angularFirestore
      .collection<Computer>('laboratories')
      .doc(laboratoryID)
      .collection('computers');

    this.computerCollection.ref
      .where('system.uuid', '==', uuid)
      .where('maintenance', '==', true)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.empty) {
          console.log('This document does not exist in the database.');
        } else {
          this.repairComputer(laboratoryID, documentSnapshot.docs[0].id);
        }
      })
      .catch(err => err.message);

  }


  repairUpdate(laboratoryID: string, computerID: string) {
    this.computerDoc = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratoryID)
      .collection<Computer>('computers')
      .doc(computerID);
    return this.computerDoc.update({maintenance: true}).then(() => true).catch(err => err.message);
  }


  /*getComputer(laboratoryID: string, uuid: string) {
    return this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratoryID)
      .collection<Computer>('computers', ref => ref
        .where('system.uuid', '==', uuid))
      .get();
  }*/

  /*getComputer(laboratoryID: string, uuid: string) {
    this.computerCollection = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratoryID)
      .collection<Computer>('computers', ref => ref
        .where('system.uuid', '==', uuid));
    return this.computerCollection.ref
      .get()
      .then(documentSnapshot => {
        return documentSnapshot;
        /!*if (documentSnapshot.exists) {
          return documentSnapshot.data();
        } else {
          return 'This document does not exist in the database.';
        }*!/
      })
      .catch(err => err.message);
  }*/

  /*getComputer(laboratoryID: string, uuid: string) {
    this.computerCollection = this.angularFirestore
      .collection<Computer>('laboratories')
      .doc(laboratoryID)
      .collection('computers', ref => ref
        .where('system.uuid', '==', uuid)
      );
    this.computer = this.computerCollection
      .snapshotChanges().map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Computer;
          const id = res.payload.doc.id;
          return { id, data };
        });
      });
    return this.computer;
  }*/


  getPlaces() {
    this.placeCollection = this.angularFirestore
      .collection<Place>('laboratories', ref => ref
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

}

