/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SinglevoteComponent } from './singlevote.component';

describe('SinglevoteComponent', () => {
  let component: SinglevoteComponent;
  let fixture: ComponentFixture<SinglevoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglevoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglevoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
