import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  private placeNameSource = new BehaviorSubject(null);
  currentPlaceName = this.placeNameSource.asObservable();

  constructor() { }

  changePlaceName(placeName) {
    this.placeNameSource.next(placeName);
  }
}
