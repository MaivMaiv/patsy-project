import { TestBed } from '@angular/core/testing';

import { PatsyDataService } from './patsy-data.service';

describe('PatsyDataService', () => {
  let service: PatsyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatsyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
