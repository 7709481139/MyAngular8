/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VotingcommentryreportComponent } from './votingcommentryreport.component';

describe('VotingcommentryreportComponent', () => {
  let component: VotingcommentryreportComponent;
  let fixture: ComponentFixture<VotingcommentryreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingcommentryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingcommentryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
