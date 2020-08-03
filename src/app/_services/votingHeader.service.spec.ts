/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VotingHeaderService } from './votingHeader.service';

describe('Service: VotingHeader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotingHeaderService]
    });
  });

  it('should ...', inject([VotingHeaderService], (service: VotingHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
