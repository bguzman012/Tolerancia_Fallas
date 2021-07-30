import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprocesoDialogComponent } from './subproceso-dialog.component';

describe('SubprocesoDialogComponent', () => {
  let component: SubprocesoDialogComponent;
  let fixture: ComponentFixture<SubprocesoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprocesoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprocesoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
