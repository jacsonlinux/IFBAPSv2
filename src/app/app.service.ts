import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  private placeTitleSource = new BehaviorSubject(null);
  currentPlaceTitle = this.placeTitleSource.asObservable();

  constructor() { }

  changePlaceTitle(placeCode) {
    this.placeTitleSource.next(placeCode);
  }
}
