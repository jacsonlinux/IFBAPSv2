import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRepairComponent } from './request-repair.component';

describe('RequestRepairComponent', () => {
  let component: RequestRepairComponent;
  let fixture: ComponentFixture<RequestRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
