import { TestBed } from '@angular/core/testing';

import { ArchivService } from './archiv.service';

describe('ArchivService', () => {
  let service: ArchivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
