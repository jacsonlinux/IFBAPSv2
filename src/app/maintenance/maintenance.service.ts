import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Repair {
  mac: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  RepairsCollection: AngularFirestoreCollection<any>;
  Repair: Observable<any>;

  constructor( private angularFirestore: AngularFirestore) { console.log('MaintenanceService'); }

  addRepairRequest(mac: string, uid: string) {

  }
}

