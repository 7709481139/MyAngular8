/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DefineVotingComponent } from './defineVoting.component';

describe('DefineVotingComponent', () => {
  let component: DefineVotingComponent;
  let fixture: ComponentFixture<DefineVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
