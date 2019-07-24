import { TestBed } from '@angular/core/testing';

import { MattersService } from './matters.service';

describe('MattersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MattersService = TestBed.get(MattersService);
    expect(service).toBeTruthy();
  });
});
