import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class TechnicalGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('TechnicalGuard');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticationService.user.map(user => {
      // if (user.profile === 'technical') {
      if (user.email === 'jacsonlinux@gmail.com') {
        return true;
      } else {
        this.router.navigate(['/unauthorized']).catch(err => err.message);
        return false;
      }
    });
  }
}

