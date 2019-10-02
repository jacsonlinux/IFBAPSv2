import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

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

  repairComputer(laboratory: string, uuid: string) {

    this.computerCollection = this.angularFirestore
      .collection<Computer>('laboratories')
      .doc(laboratory)
      .collection('computers');

    return this.computerCollection.ref
      .where('system.uuid', '==', uuid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.empty) {
          return false;
        } else {
          return this.computerCollection.ref
            .where('maintenance', '==', false)
            .get()
            .then(documentSnapshot => {
              if (documentSnapshot.empty) {
                return false;
              } else {
                const computer = documentSnapshot.docs[0].id;
                return this.repairUpdate(`${laboratory}`, `${computer}`, true)
                  .then(res => res)
                  .catch(err => err.message);
              }
            })
            .catch(err => err.message);
        }
      })
      .catch(err => err.message);
  }

  repairUpdate(laboratory: string, computer: string, maintenance: boolean) {
    this.computerDoc = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratory)
      .collection<Computer>('computers')
      .doc(computer);
    return this.computerDoc
      .update({maintenance: maintenance})
      .then(() => true)
      .catch(err => err.message);
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

