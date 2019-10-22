import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerScanComponent } from './computer-scan.component';

describe('ComputerScanComponent', () => {
  let component: ComputerScanComponent;
  let fixture: ComponentFixture<ComputerScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
