/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VotingreportComponent } from './votingreport.component';

describe('VotingreportComponent', () => {
  let component: VotingreportComponent;
  let fixture: ComponentFixture<VotingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
