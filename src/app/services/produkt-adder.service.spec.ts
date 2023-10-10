import { TestBed } from '@angular/core/testing';

import { ProduktAdderService } from './produkt-adder.service';

describe('ProduktAdderService', () => {
  let service: ProduktAdderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduktAdderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
