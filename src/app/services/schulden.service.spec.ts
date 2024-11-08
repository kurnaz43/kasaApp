import { TestBed } from '@angular/core/testing';

import { SchuldenService } from './schulden.service';

describe('SchuldenService', () => {
  let service: SchuldenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchuldenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
