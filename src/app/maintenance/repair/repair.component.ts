import {Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {QrScannerComponent} from 'angular2-qrscanner';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RepairComponent implements OnInit, AfterViewInit {

  @ViewChild(QrScannerComponent, {static: true}) qrScannerComponent: QrScannerComponent;

  constructor(
    private appService: AppService, private router: Router
  ) { console.log('RepairComponent'); }

  getDevice() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('back')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });
  }

  ngOnInit() {
    this.appService.changePlaceTitle('Repair');
  }

  ngAfterViewInit() {
    this.getDevice();
    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
    });
  }

}

