import { TestBed, async, inject } from '@angular/core/testing';

import { TechnicalGuard } from './technical.guard';

describe('TechnicalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnicalGuard]
    });
  });

  it('should ...', inject([TechnicalGuard], (guard: TechnicalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
