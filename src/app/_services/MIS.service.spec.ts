/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MISService } from './MIS.service';

describe('Service: MIS', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MISService]
    });
  });

  it('should ...', inject([MISService], (service: MISService) => {
    expect(service).toBeTruthy();
  }));
});
