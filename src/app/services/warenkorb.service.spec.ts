import { TestBed } from '@angular/core/testing';

import { WarenkorbService } from './warenkorb.service';

describe('WarenkorbService', () => {
  let service: WarenkorbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarenkorbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
