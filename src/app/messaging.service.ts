import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MzToastService } from 'ngx-materialize';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private angularFirestore: AngularFirestore,
    private toastService: MzToastService,
  ) {
    console.log('MessagingService');
  }

  getPermission(user) {
    this.angularFireMessaging.requestToken
      .subscribe(
        (token) => {
          console.log(token);
          console.log('Permission granted!');
          this.saveToken(user, token);
        },
        (error) => { console.error(error); },
      );
  }

  monitorRefresh(user) { }

  receiveMessages() {
    this.angularFireMessaging.messages
      .subscribe((message) => {
        this.toastService.show('Novo reparo solicitado!', 3000, 'orange');
      });
  }

  private saveToken(user, token): void {
    console.log('Save to the server!');
    const currentTokens = user.fcmTokens || {};
    if (!currentTokens[token]) {
      const userRef = this.angularFirestore.collection('users').doc(user.uid);
      const tokens = {...currentTokens, [token]: true};
      userRef.set({fcmTokens: tokens}, {merge: true}).then().catch(err => err.message);
    }
  }

}
