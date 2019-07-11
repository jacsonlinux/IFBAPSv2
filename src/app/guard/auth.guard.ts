import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import {AuthenticationService} from '../authentication/authentication.service';
import {AngularFireAuth} from '@angular/fire/auth';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) { console.log('AuthGuard'); }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.angularFireAuth.authState
      .take(1)
      .map(authState => !!authState && authState.emailVerified )
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['']).catch(err => err.message);
        } else {
          this.authenticationService.showMenuEmitter.emit(true);
        }
      });
  }
}
