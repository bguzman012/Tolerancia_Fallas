import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  DetailManagementComponent } from './detail-management.component';

describe('NewManagementComponent', () => {
  let component: DetailManagementComponent;
  let fixture: ComponentFixture<DetailManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
