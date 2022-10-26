import { TestBed } from '@angular/core/testing';

import { PrayServiceService } from './pray-service.service';

describe('PrayServiceService', () => {
  let service: PrayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
