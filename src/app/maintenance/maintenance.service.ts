import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Equipment} from '../schedules/schedules.service';

export interface Repair {
  mac: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  RepairCollection: AngularFirestoreCollection<any>;
  Repair: Observable<any>;

  constructor( private angularFirestore: AngularFirestore) { console.log('MaintenanceService'); }

  addRepairRequest() {

  }

  getRepairRequest(mac: string) {
    this.RepairCollection = this.angularFirestore.
      collection<Repair>('repairs',ref => ref.
      orderBy('mac'));
  }
}

// getEquipaments() {
//   this.equipmentCollection = this.angularFirestore
//     .collection<Equipment>('equipments', ref => ref
//       .orderBy('description'));
//
//   this.equipments = this.equipmentCollection
//     .snapshotChanges().map(actions => {
//       return actions.map(res => {
//         const data = res.payload.doc.data() as Equipment;
//         const id = res.payload.doc.id;
//         return { id, data };
//       });
//     });
//   return this.equipments;
// }
