import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprocesoComponent } from './subproceso.component';

describe('SubprocesoComponent', () => {
  let component: SubprocesoComponent;
  let fixture: ComponentFixture<SubprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprocesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
