import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactoEconomicoComponent } from './impacto-economico.component';

describe('ImpactoEconomicoComponent', () => {
  let component: ImpactoEconomicoComponent;
  let fixture: ComponentFixture<ImpactoEconomicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactoEconomicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactoEconomicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
