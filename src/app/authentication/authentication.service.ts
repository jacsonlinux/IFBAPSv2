import { EventEmitter, Injectable } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import {error} from "selenium-webdriver";

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  profile: string;
  fcmTokens?: { [token: string]: true };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  showMenuEmitter = new EventEmitter<boolean>();

  user: Observable<User>;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {
    console.log('AuthenticationService');
    this.user = angularFireAuth.authState.switchMap(user => {
      if (user) {
        return this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.empty();
      }
    });
  }

  signUp(data) {
    return this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        if (res.user.uid) {
          res.user.sendEmailVerification().catch(err => err.message);
          return this.updateUserData(res.user, 'server', data.name)
            .then(() => {
              this.signOut();
              return true;
            })
            .catch(err => err.message );
        }
      } )
      .catch(err => err.message );
  }

  logIn(data) {
    return this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(res => res.user)
      .catch(err => err.message);
  }

  logInGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  logInTwitter() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  logInGitHub() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        const profile = 'public';
        this.updateUserData(credential.user, profile).catch(err => err.message);
      })
      .catch(err => err.message);
  }

  updateUserData(user, profile, name?) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${user.uid}`);
    const photoURL = 'https://firebasestorage.googleapis.com/v0/b/ifba-portoseguro.appspot.com/o/account.png?alt' +
      '=media&token=f5ece42a-fcd2-4b55-bfa6-8e1e78e38be7';
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ? user.displayName : name ,
      photoURL: user.photoURL ? user.photoURL : photoURL,
      profile
    };
    return userRef
      .set(data)
      .then(() => 'Document successfully written!')
      .catch(err => err.message);
  }

  signOut() {
    this.angularFireAuth.auth
      .signOut()
      .then(() => {
        this.showMenuEmitter.emit(false);
        this.router.navigate(['']).catch(err => err.message);
      })
      .catch(err => err.message);
  }

  profile() { return this.user.map(user => user.profile); }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email).
    then(() => {
      return null;
    }).catch(err => err.message);
  }

}
