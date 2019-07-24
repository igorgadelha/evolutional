import { TestBed } from '@angular/core/testing';

import { ClassroomsService } from './classrooms.service';

describe('ClassroomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassroomsService = TestBed.get(ClassroomsService);
    expect(service).toBeTruthy();
  });
});
