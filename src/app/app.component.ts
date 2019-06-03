import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { MzMediaService } from 'ngx-materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public smallResolution: Observable<boolean>;
  public largeResolution: Observable<boolean>;

  constructor(private mediaService: MzMediaService) {
    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    this.largeResolution = this.mediaService.isActive('gt-s'); // small screen resolution
  }
}
