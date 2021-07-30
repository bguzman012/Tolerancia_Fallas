import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoDialogComponent } from './proceso-dialog.component';

describe('ProcesoDialogComponent', () => {
  let component: ProcesoDialogComponent;
  let fixture: ComponentFixture<ProcesoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
