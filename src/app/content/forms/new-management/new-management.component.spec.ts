import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewManagementComponent } from './new-management.component';

describe('NewManagementComponent', () => {
  let component: NewManagementComponent;
  let fixture: ComponentFixture<NewManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
