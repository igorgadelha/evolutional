import { TestBed } from '@angular/core/testing';

import { DegreesService } from './degrees.service';

describe('DegreesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DegreesService = TestBed.get(DegreesService);
    expect(service).toBeTruthy();
  });
});
