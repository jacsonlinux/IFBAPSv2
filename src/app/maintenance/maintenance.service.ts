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
export class MaintenanceService {

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

  repairComputer(laboratory: string, uuid: string) {

    this.computerCollection = this.angularFirestore
      .collection<Computer>('laboratories')
      .doc(laboratory)
      .collection('computers');

    return this.computerCollection.ref
      .where('system.uuid', '==', uuid)
      .get()
      .then(documentSnapshot1 => {
        if (documentSnapshot1.empty) {
          return false;
        } else {
          return this.computerCollection.ref
            .where('maintenance', '==', false)
            .get()
            .then(documentSnapshot2 => {
              if (documentSnapshot2.empty) {
                return false;
              } else {
                const computer = documentSnapshot2.docs[0].id;
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
      .update({maintenance})
      .then(() => true)
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
            .collection<Computer>('computers', ref => ref.where('maintenance', '==', true));
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


  /*getComputersInMaintenance() {
    this.laboratoryCollection = this.angularFirestore
      .collection<Laboratory>('laboratories', ref => ref.orderBy('code'));
    this.laboratories = this.laboratoryCollection
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const dataLab = a.payload.doc.data();
          const idLab = a.payload.doc.id;
          this.computerCollection = this.angularFirestore
            .collection<Laboratory>('laboratories')
            .doc(idLab)
            .collection<Computer>('computers', ref => ref.where('maintenance', '==', false));
          const computers = this.computerCollection.valueChanges();
          return {idLab, dataLab, computers };
        });
      });
    return this.laboratories;
  }*/

  /*getComputersInMaintenance() {
    this.laboratoryCollection = this.angularFirestore
      .collection<Laboratory>('laboratories', ref => ref.orderBy('code'));
    this.laboratories = this.laboratoryCollection
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const dataLab = a.payload.doc.data();
          const idLab = a.payload.doc.id;
          this.computerCollection = this.angularFirestore
            .collection<Laboratory>('laboratories')
            .doc(idLab)
            .collection<Computer>('computers', ref => ref.where('maintenance', '==', false));
          const computers = this.computerCollection
            .snapshotChanges().map(aactions => {
            return aactions.map(aa => {
              const dataComputer = aa.payload.doc.data();
              const idComputer = aa.payload.doc.id;
              return {idComputer, dataComputer, };
            });
          });
          return {idLab, dataLab, computers };
        });
      });
    return this.laboratories;
  }*/

  /*getComputersInMaintenance() {

    const arrLab = [];
    const arrComputers = [];

    this.getLaboratories()
      .subscribe(laboratories => {
        laboratories.map(res => {
          arrLab.push(res.id);
        });


        arrLab.map(res => {
          this.computerCollection = this.angularFirestore
            .collection<Laboratory>('laboratories')
            .doc(res)
            .collection<Computer>('computers');

          this.computerCollection.snapshotChanges().map(actions => {
            actions.map(a => {
              const data = a.payload.doc.data() as Computer;
              const id = a.payload.doc.id;
              arrComputers.push({ id, data });
            });
          });
        });
        console.log(arrComputers);
      });
  }*/

  /*, ref => ref.where('maintenance', '==', true)*/

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

  /*return this.laboratoryCollection
      .snapshotChanges().subscribe(res => {
      res.map(r => {
        this.computerCollection = this.angularFirestore
          .collection('laboratories')
          .doc(r.payload.doc.id)
          .collection('computers');

        return this.computerCollection
          .snapshotChanges()
          .subscribe(rr => {
            rr.map(rrr => {
              const data = rrr.payload.doc.data() as Computer;
              const id = rrr.payload.doc.id;
              return { id, data };
            });
          });
      });
    });*/
  /*getComputersInMaintenance() {
  this.laboratoryCollection = this.angularFirestore.collection<Laboratory>('laboratories', ref => ref.orderBy('description'));
  this.laboratoryCollection.snapshotChanges()
    .map(actions => { actions.map(a => {
      const id = a.payload.doc.id;
      this.computerCollection = this.angularFirestore
        .collection<Laboratory>('laboratories')
        .doc(id)
        .collection<Computer>('computers', ref => ref.where('maintenance', '==', true));
    });
  });
  // return this.laboratories;
}*/

}
