import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Laboratory {
  block: string;
  code: string;
  description: string;
  email: string;
  status: boolean;
  computers: any;
}
export interface LaboratoryId extends Laboratory { id: string; }

export interface Computer { data: object; }
export interface ComputerId extends Computer { id: string; }

@Injectable({
  providedIn: 'root'
})
export class LaboratoriesService {

  private computerSource = new BehaviorSubject(null);
  currentComputer = this.computerSource.asObservable();

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


  repairComputer(laboratory: string, uuid: string, comment: string, user: string) {

    this.computerDoc = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratory)
      .collection<Computer>('computers')
      .doc(uuid);

    return this.computerDoc
      .ref
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          if (!data.hasOwnProperty('maintenance')) {
            return this.computerDoc
              .update({maintenance: {status: true, user, comment}})
              .then(() => {
                return {status: 1, message: 'Open call successfully' };
              } )
              .catch(err => err.message);
          } else {
            if (data.maintenance.status === false) {
              return this.computerDoc
                .update({maintenance: {status: true, user, comment}})
                .then(() => {
                  return {status: 1, message: 'Open call successfully' };
                })
                .catch(err => err.message);
            } else  {
              return {status: 2, message: 'Equipment already under maintenance'};
            }
          }
        } else {
          return {status: 3, message: 'Document does not exist in database'};
        }
      })
      .catch(err => err.message);
  }

  getLaboratories() {
    this.laboratoryCollection = this.angularFirestore
      .collection<Laboratory>('laboratories', ref => ref
        .orderBy('code'));

    this.laboratories = this.laboratoryCollection
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Laboratory;
          const id = a.payload.doc.id;
          this.computerCollection = this.angularFirestore
            .collection<Laboratory>('laboratories')
            .doc(id)
            .collection<Computer>('computers', ref => ref.where('maintenance.status', '==', true));
          const computers = this.computerCollection.valueChanges();
          return { id, data, computers };
        });
      });
    return this.laboratories;
  }

  getComputers(laboratory) {
    this.computerCollection = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratory)
      .collection<Computer>('computers', ref => ref.orderBy('maintenance'));

    this.computers = this.computerCollection
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Computer;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
    return this.computers;

  }

  getComputer(laboratory, computer) {
    this.computerDoc = this.angularFirestore
      .collection<Laboratory>('laboratories')
      .doc(laboratory)
      .collection<Computer>('computers')
      .doc(computer);

    return this.computerDoc.snapshotChanges()
      .map(res => {
        const id = res.payload.id;
        const data = res.payload.data() as Computer;
        return {id, data};
      });
  }

  changeComputer(computer) {
    this.computerSource.next(computer);
  }

}
