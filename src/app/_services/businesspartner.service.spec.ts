import { TestBed } from '@angular/core/testing';

import { BusinesspartnerService } from './businesspartner.service';

describe('BusinesspartnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinesspartnerService = TestBed.get(BusinesspartnerService);
    expect(service).toBeTruthy();
  });
});
