import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactoEconomicoDialogComponent } from './impacto-economico-dialog.component';

describe('ImpactoEconomicoDialogComponent', () => {
  let component: ImpactoEconomicoDialogComponent;
  let fixture: ComponentFixture<ImpactoEconomicoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactoEconomicoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactoEconomicoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
