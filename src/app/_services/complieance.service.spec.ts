/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComplieanceService } from './complieance.service';

describe('Service: Complieance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplieanceService]
    });
  });

  it('should ...', inject([ComplieanceService], (service: ComplieanceService) => {
    expect(service).toBeTruthy();
  }));
});
